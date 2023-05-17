const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
 
  products: [productSchema]
});


const Product = mongoose.model('Product', productSchema);
const Store = mongoose.model('Store', storeSchema);

module.exports = { Product, Store };
