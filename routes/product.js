// Routes > Product

//[Module and Dependencies]
const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");
const {verify, verifyAdmin} = auth;

//[Routing Component]
const router = express.Router();

//[Create a product]
router.post("/", verify, verifyAdmin, productController.addProduct)

//[Route for retrieving all products]
router.get("/all",productController.getAllProducts);

//[Route for retrieving all active products]
router.get("/",productController.getAllActiveProducts);

//[Get a specific product]
router.get("/:productId",productController.getProduct);

//[Update a specific product]
router.put("/:productId",verify, verifyAdmin, productController.updateProduct);

//[Archive a product]
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

//[Activate an archive product]
router.put("/:productId/activate", verify, verifyAdmin, productController.archiveProduct);


//[Export Routes]
module.exports = router;