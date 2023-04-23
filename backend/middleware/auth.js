
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    console.log(token)

    if (!token) {
        return next(new ErrorHandler(" ", 401))
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodeData.id)
    next()
})

//for admin authorization
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log('req.user',req.user)
        if(!req.user){
            return next(
                new ErrorHandler(
                    "User is not authenticated", 401
                )
            )
        }
        if (!roles.includes(req?.user?.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req?.user?.role} is not allowed to access this resource`, 403
                )
            )
        }
        next()
    }
}