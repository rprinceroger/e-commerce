// Models > Order

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({   
	    userId : {
	        type : String,
	        required : [true, "User ID is required"]
	    },
	    products : [{
	    	productId : {
	    		type : String,
	    		required : [true, "Product ID is required"]
	    	},
	    	quantity : Number
	    }],
	    totalAmount : Number,
        purchaseDate : {
            type : Date,
            default : new Date()
        }
});

// [Export Model]
module.exports = mongoose.model("Order",orderSchema);