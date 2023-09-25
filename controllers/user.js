const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// User Controller

// Check if an email already exists
module.exports.checkEmail = (req, res) => {
  const emailToCheck = req.body.email;

  User.find({ email: emailToCheck })
    .then((result) => {
      if (result.length > 0) {
        res.json({ emailExists: true });
      } else {
        res.json({ emailExists: false });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// User registration
module.exports.registerUser = (req, res) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    mobileNo: req.body.mobileNo,
    address: req.body.address,
  });

  return newUser
    .save()
    .then((user) => {
      res.json({ success: true, message: "User registered successfully" });
    })
    .catch((err) => {
      res.json({ success: false, error: err.message });
    });
};

// User login/authentication
module.exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((result) => {
      console.log(result);
      if (result == null) {
        return res.json({ error: "Invalid credentials" });
      } else {
        const isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          result.password
        );
        if (isPasswordCorrect) {
          return res.json({ access: auth.createAccessToken(result) });
        } else {
          return res.json({ success: false });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({ error: "Internal server error" });
    });
};

// Retrieve user details
module.exports.getProfile = (req, res) => {
  return User.findById(req.user.id)
    .then((result) => {
      result.password = "";
      return res.send(result);
    })
    .catch((err) => res.send(err));
};

// Change user to admin (Admin Only)
module.exports.updateUserAsAdmin = async (req, res) => {
  const userIdToUpdate = req.params.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userIdToUpdate,
      { isAdmin: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.send("User not found");
    }

    return res.send("User updated as admin successfully");
  } catch (error) {
    console.error(error);
    return res.send("Failed to update user as admin");
  }
};

// Reset password
module.exports.resetPassword = async (req, res) => {
  const { id } = req.user;
  const { newPassword } = req.body;

  try {
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.send("Password reset successful");
  } catch (error) {
    return res.send("Error resetting password");
  }
};

// Update user profile
module.exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, mobileNo, address } = req.body;

    // Update the user's profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, mobileNo, address },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    return res.send("Failed to update profile");
  }
};
