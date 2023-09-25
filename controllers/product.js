const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Product Controller

// Create a new product
module.exports.createProduct = (req, res) => {
  let newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl,
  });

  newProduct
    .save()
    .then((product) => {
      const createdProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
      };
      return res.status(201).json(createdProduct);
    })
    .catch((err) => {
      console.error("Error creating product:", err);
      return res
        .status(500)
        .json({ error: "Could not create product", message: err.message });
    });
};

// Retrieve all products (Admin Only)
module.exports.getAllProducts = (req, res) => {
  return Product.find({})
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => res.send(err));
};

// Retrieve all active products
module.exports.getAllActiveProducts = (req, res) => {
  return Product.find({ isActive: true }).then((result) => {
    return res.send(result);
  });
};

// Retrieve a specific product
module.exports.getProduct = (req, res) => {
  return Product.findById(req.params.productId).then((result) => {
    return res.send(result);
  });
};

// Update a specific product (Admin Only)
module.exports.updateProduct = (req, res) => {
  let updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: req.body.imageUrl,
  };

  return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then(
    (product, error) => {
      if (error) {
        return res.send(false);
      } else {
        res.send(true);
      }
    }
  );
};

// Archive a product (Admin Only)
module.exports.archiveProduct = (req, res) => {
  return Product.findByIdAndUpdate(req.params.productId, { isActive: false })
    .then((product) => {
      if (product) {
        return res.send(true);
      } else {
        return res.send(false);
      }
    })
    .catch((error) => {
      return res.send(false);
    });
};

// Activate a product (Admin Only)
module.exports.activateProduct = (req, res) => {
  const productId = req.params.productId;

  return Product.findByIdAndUpdate(productId, { isActive: true }).then(
    (product, error) => {
      if (error) {
        return res.send(false);
      } else {
        return res.send(true);
      }
    }
  );
};

// Search for products by name
module.exports.searchProductsByName = async (req, res) => {
  try {
    const { productName } = req.body;

    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
      isActive: true,
    });

    if (products.length === 0) {
      return res.send("No such product found.");
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};
