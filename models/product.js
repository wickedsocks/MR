const mongoose = require('mongoose');

// Creation and validation for database entity
let schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  }
});

const Product = mongoose.model("Product", schema);

module.exports = {
  Product
}
