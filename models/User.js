// Models > User

const mongoose = require("mongoose");

//[Schema/Blueprint]
const userSchema = new mongoose.Schema({
	nickName : {
        type : String,
        required : [true, "How would you like us to address you?"]
    },
    email : {
    type : String,
    required : [true, "Email is required"]
	},
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    isAdmin : {
        type : Boolean,
        default : false
    },

});

// [Export Model]
module.exports = mongoose.model("User", userSchema);