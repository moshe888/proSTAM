const express = require('express');
const router = express.Router();
const Product = require('../models/store');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Create a product
// router.post('/', async (req, res) => {
//   const product = new Product({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     image: req.body.image,

//    });

//   try {
//     const newProduct = await product.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Delete a product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a single product by id
async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    res.product = product;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = router;
