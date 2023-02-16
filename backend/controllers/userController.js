const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require("../models/userModel");
const sendToken = require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail");

//Register a User
exports.registerUser = catchAsyncErrors(async(req, res, next)=>{
    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        userimage: {
            public_id: "this is a sample ID",
            url: "profilephotoUrl"
        },
    });

    sendToken(user, 201, res)
});

//login user
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    //checking if user has password and email both

    //if some data is not put by the user
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password", 400))
    }

    //if user entered both the fields then find it in database
    const user = await User.findOne({email}).select("+password")

    //if user not found
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    //check user and password is matched or not
    const isPasswordMatched = user.comparePassword(password)

    //if password incirrect
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    //if user and password matched
    sendToken(user, 200, res)
})

//logout user
exports.logout = catchAsyncErrors(async(req, res,next)=>{

    res.cookie("token",null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    })
})


//forgot password
exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }

    //get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try{
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce password recovery',
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500))
    }
})


//Reset password is remaining






//get user details
exports.getUserDetails = catchAsyncErrors(async(req, res,next)=>{
    console.log('req', req.user)
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success: true,
        user,
    });
});


//update user password
exports.updatePassword = catchAsyncErrors(async(req, res,next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is incorrect",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not matched", 400))
    }

    user.password = req.body.newPassword;

    await user.save()

    sendToken(user, 200, res)
})

//update user profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})

//get all users(admin)
exports.getAllUser = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})

//get single user(admin)
exports.getSingleUser = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user,
    })
})

//update user role(admin)
exports.updateUser = catchAsyncErrors(async(req, res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //here we dont have to req.user.id, because it will update admin itself
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false,
    });

    if(!user){
        return next(new ErrorHandler(`User not found with Id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true
    })

})

//delete user(admin)
exports.deleteUser = catchAsyncErrors(async(req, res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with Id: ${req.params.id}`))
    }

    await user.remove()

    res.status(200).json({
        success: true,
        message: "User deleted Successfully",
    });
})
