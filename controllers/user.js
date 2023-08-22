// Controller > User

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const auth = require("../auth");

//[Check duplicate email]
module.exports.checkEmailExists = (reqbody) =>{
	return User.find({email:reqbody.email}).then(result=>{	
		if(result.length > 0){
			return true;
		}else{
			return false;
		}
	})
};

//[User Registration]
module.exports.registerUser = (reqbody) =>{

	let newUser = new User({
		nickName: reqbody.nickName,
		email:reqbody.email,
		password: bcrypt.hashSync(reqbody.password,10)
	})

	return newUser.save().then((user,error)=>{
		if(error){
			return false;
		}else{
			return true
		}

	})
	.catch(err=>err)
}



//[User authentication]
module.exports.loginUser = (req,res)=>{
	return User.findOne({email:req.body.email}).then(result=>{
		if(result===null){
			return false;
		}else{
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password)
			if(isPasswordCorrect){
				return res.send({access: auth.createAccessToken(result)})
			}
			else{
				return res.send(false);
			}
		}
	})
	.catch(err=>res.send(err))
};

//[Retrieve user details]
module.exports.getProfile = (req, res) => {
    return User.findById(req.user.id)
    .then(result => {
        result.password = "";
        return res.send(result);
    })
    .catch(err => res.send(err))
};

//[Function to reset the password]
module.exports.resetPassword = async (req, res) => {
  try {

    const { newPassword } = req.body;
    const { id } = req.user; // Extracting user ID from the authorization header

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(id, { password: hashedPassword });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//[Update user as admin]
module.exports.updateUserAsAdmin = async (req, res) => {
	try {
	  const { userId } = req.body;
  
	  // Find the user and update isAdmin flag
	  const user = await User.findById(userId);
  
	  if (!user) {
		return res.status(404).json({ error: 'User not found' });
	  }
  
	  user.isAdmin = true;
  
	  // Save the updated user document
	  await user.save();
  
	  res.status(200).json({ message: 'User updated as admin successfully' });
	} catch (error) {
	  res.status(500).json({ error: 'An error occurred while updating the user as admin' });
	}
};