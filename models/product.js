const mongoose = require('mongoose');

// Creation and validation for database entity
let schema = new mongoose.Schema({
  images: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true
  },
  manufactureCategory: {
    type: String,
    required: true
  },
  color: [
    {
      type: String,
      required: true
    }
  ],
  productProperties: [
    {
      price: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      }
    }
  ],
  categories: {
    type: [String],
    required: true
  },
  url: {
    type: String,
    required: true
  }
});
schema.index({ title: 1 });

const Product = mongoose.model('Product', schema);

module.exports = {
  Product
};
