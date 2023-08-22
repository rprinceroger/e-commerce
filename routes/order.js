// Routes > Order

//[Modules and Dependencies]
const express = require("express");
const orderController = require("../controllers/order");
const auth = require("../auth");
const { verify, verifyAdmin } = auth;

//[Routing Component]
const router = express.Router();

//[Create Order]
router.post("/checkout", verify, orderController.order);

//Export Route System
module.exports = router;