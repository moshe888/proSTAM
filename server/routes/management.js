const express = require("express");
const router = express.Router();

const Store = require("../models/store");

// const Product = require("../models/product");

// Route for getting all products for a store
router.get("/:storeId/products", async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const products = await Product.find({ store: store._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route for adding a product to a store
// router.post("/:storeId/products", async (req, res) => {
//   const { name, description, price, image } = req.body;

//   try {
//     const store = await Store.findById(req.params.storeId);
//     if (!store) {
//       return res.status(404).json({ message: "Store not found" });
//     }

//     if (!image) {
//       return res.status(400).json({ message: "Image is required" });
//     }

//     const product = new Product({
//       name,
//       description,
//       price,
//       image,
//       store: store._id,
//     });

//     await product.save();

//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// Route for updating a product for a store
router.put("/:storeId/products/:productId", async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const product = await Product.findOne({
      _id: req.params.productId,
      store: store._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;
    product.price = price;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route for deleting a product for a store
router.delete("/:storeId/products/:productId", async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const product = await Product.findOne({
      _id: req.params.productId,
      store: store._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
