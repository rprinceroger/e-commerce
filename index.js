// Import necessary modules and libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

require('dotenv').config();

// Define the port for the server
const port = 4000;

// Create an instance of the Express application
const app = express();

// Apply middleware for handling CORS, parsing JSON, and URL-encoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the MongoDB database
mongoose.connect(`${process.env.MONGODB_URL}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Handle MongoDB connection events
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => console.log("Connected to MongoDB Atlas"));

// Define backend routes for users, products, and orders
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Start the server and listen for incoming requests
if (require.main === module) {
  app.listen(process.env.PORT || port, () => {
    console.log(`API is now online on Port ${process.env.PORT || port}`);
  });
}

// Export the Express app and mongoose for external use
module.exports = { app, mongoose };
