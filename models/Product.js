// Models > Product

const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
	name : {
		type : String,
		required: [true,"Product name is required"]
	},
	description : {
		type: String,
		required: [true,"Description is required"]
	},
	price: {
		type: Number,
		required: [true,"Price is required"]
	},
	isActive:{
		type: Boolean,
		default: true
	},
    status : {
        type : String,
        default : "In-Stack"
    },
	createdOn:{
		type: Date,
		default:new Date()
	},

});

// [Export Model]
module.exports = mongoose.model("Product",productSchema);