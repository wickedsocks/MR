const mongoose = require('mongoose');

let categoryShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  }
});

function categoryURLNaming(categoryName) {
  return categoryName.toLowerCase().trim().split(' ').join('_');
}

categoryShema.statics.categoryURLNaming = categoryURLNaming;

const CategoryManufacture = mongoose.model("categories_manufacture", categoryShema);
const CategoryProduct = mongoose.model('categories_product', categoryShema)

module.exports = {
  CategoryManufacture,
  CategoryProduct
}