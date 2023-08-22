// Controllers > Product

const Product = require("../models/Product");
const User = require("../models/User");

//[Add new product]
module.exports.addProduct = (req, res) => {
    let newProduct = new Product({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    });
    return newProduct.save().then((product, error) => {
        if (error) {
            return res.send(false);
        } else {
            return res.send(true);
        }
    })
    .catch(err => res.send(err))
};

//[Get all products]
module.exports.getAllProducts = (req,res)=>{
    return Product.find({}).then(result=>{
        return res.send(result)
    })
};

//[Get active products]
module.exports.getAllActiveProducts = (req,res)=>{
    return Product.find({isActive:true}).then(result=>{
        return res.send(result)
    })
};

//[Get specific product]
module.exports.getProduct = (req,res)=>{
    return Product.findById(req.params.productId).then(result=>{
        return res.send(result)
    })
};

//[Update specific product]
module.exports.updateProduct = (req,res)=>{
    let updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };
    return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error)=>{
        if(error){
            return res.send(false);
        }else{
            return res.send(true);
        }
    });
};

//[Archive specific product]
module.exports.archiveProduct = (req, res) => {
    let updateActiveField = {
        isActive: false
    }
    return Product.findByIdAndUpdate(req.params.productId, updateActiveField).then((product, error)=>{
        if(error){
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
    .catch(err => res.send(err))
};

//[Activate specific product]
module.exports.activateProduct = (req, res) => {
    let updateActiveField = {
        isActive: true
    }
    return Product.findByIdAndUpdate(req.params.productId, updateActiveField).then((product, error)=>{
        if(error){
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
    .catch(err => res.send(err))
};