const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  data: String
});

const Error = mongoose.model('Error', schema);

module.exports = {
  Error
}