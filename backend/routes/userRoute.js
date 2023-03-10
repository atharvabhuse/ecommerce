const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, deleteUser, updateUser } = require("../controllers/userController");
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logout)

router.route("/password/forgot").post(forgotPassword)

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser,updatePassword)

router.route("/me/update").put(isAuthenticatedUser,updateProfile)

router.route("/admin/users").get(isAuthenticatedUser,getAllUser)

router.route("/admin/user/:id").get(isAuthenticatedUser,getSingleUser).put(isAuthenticatedUser, updateUser).delete(isAuthenticatedUser, deleteUser)

module.exports = router;
