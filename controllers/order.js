// Controller > Order

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");

// [Create order]
module.exports.order = async (req, res) => {
  try {
    console.log("User ID:", req.user.id);
    console.log("Product ID:", req.body.productId);

    if (req.user.isAdmin) {
      return res.status(403).send("Action Forbidden");
    }

    let user = await User.findById(req.user.id);
    if (!user) {
      console.log("User not found.");
      return res.status(404).send({ message: "User not found" });
    }

    let product = await Product.findById(req.body.productId);
    if (!product) {
      console.log("Product not found.");
      return res.status(404).send({ message: "Product not found" });
    }

    // Required field
    let { userId, productId, quantity, totalAmount } = req.body;

    // Create a new order instance
    let order = new Order({
      userId: req.user.id,
      products: [{productId, quantity}],
      totalAmount: totalAmount
    });

    // Save the order to the database
    await order.save();




    return res.status(200).send({ message: "Checkout was successful." });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ message: "An error occurred during checkout." });
  }
};




