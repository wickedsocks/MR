const mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  tel: {
    type: Number,
    required: true
  },
  comment: {
    type: String
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order
}
