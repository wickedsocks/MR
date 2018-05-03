const mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  products: {
    type: Array,
    required: true,
    validate: [productsLengthLimit, "{PATH} product array length should be at least 1"]
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
  },
  totalPrice: {
    required: true,
    type: Number
  }
});

function productsLengthLimit(val) {
  return val.length > 0;
}

const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order
}
