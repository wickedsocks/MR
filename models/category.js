const mongoose = require('mongoose');

let manufactureCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

let productCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

function categoryURLNaming(categoryName) {
  return categoryName.toLowerCase().trim().replace(' ', '_');
}

manufactureCategory.statics.categoryURLNaming = categoryURLNaming;
productCategory.statics.categoryURLNaming = categoryURLNaming;

const CategoryManufacture = mongoose.model("categories_manufacture", manufactureCategory);
const CategoryProduct = mongoose.model('categories_product', productCategory)

module.exports = {
  CategoryManufacture,
  CategoryProduct
}