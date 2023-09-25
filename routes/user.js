const express = require("express");
const userController = require("../controllers/user");
const auth = require("../auth");
const { verify, verifyAdmin } = auth;

const router = express.Router();

// Routes for handling user details

// Check if an email already exists
router.post("/checkEmail", userController.checkEmail);

// User registration
router.post("/register", userController.registerUser);

// User login
router.post("/login", userController.loginUser);

// Get user profile
router.post("/profile", verify, userController.getProfile);

// Change a user to admin (Admin Only)
router.put("/updateAdmin/:userId", verify, verifyAdmin, userController.updateUserAsAdmin);

// Password reset
router.post("/resetPassword", verify, userController.resetPassword);

// Update user profile
router.put("/updateProfile", verify, userController.updateProfile);

module.exports = router;
