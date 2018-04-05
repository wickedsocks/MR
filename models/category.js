const mongoose = require('mongoose');

let manufactureCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

let procutCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const CategoryManufacture = mongoose.model("categories_manufacture", manufactureCategory);
const CategoryProduct = mongoose.model('categories_product', procutCategory)

module.exports = {
  CategoryManufacture,
  CategoryProduct
}