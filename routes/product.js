const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");
const { verify, verifyAdmin } = auth;

const router = express.Router();

// Routes for handling products

// Create a new product (Admin Only)
router.post("/", verify, verifyAdmin, productController.createProduct);

// Retrieve all products (Admin Only)
router.get("/all", productController.getAllProducts);

// Retrieve all active products
router.get("/", productController.getAllActiveProducts);

// Retrieve a specific product
router.get("/:productId", productController.getProduct);

// Update a specific product (Admin Only)
router.put("/:productId", verify, verifyAdmin, productController.updateProduct);

// Archive a specific product (Admin Only)
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

// Activate a specific product (Admin Only)
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

// Search for products by name
router.post("/search", productController.searchProductsByName);

module.exports = router;
