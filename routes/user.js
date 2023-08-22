// Routes > User

//[Modules and Dependencies]
const express = require("express");
const userController = require("../controllers/user");
const auth = require("../auth");
const { verify, verifyAdmin } = auth;

//[Routing Component]
const router = express.Router();

//[Check email]
router.post("/checkEmail",(req,res)=>{
	userController.checkEmailExists(req.body).then(resultFromController=>res.send(resultFromController))
});

//[Register a user]
router.post("/register",(req,res)=>{
	userController.registerUser(req.body).then(resultFromController=>res.send(resultFromController))
});

//[User Authentication]
router.post("/login",userController.loginUser);

//[Retrieve user details]
router.post("/details", verify, userController.getProfile);

//[Update user as admin]
router.put('/updateAdmin', verify, verifyAdmin, userController.updateUserAsAdmin);


//[Export Route System]
module.exports = router;