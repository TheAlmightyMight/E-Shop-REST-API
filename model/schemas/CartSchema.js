const mongoose = require("mongoose");
const validator = require("validator");

const cartItemSchema = new mongoose.Schema({
  title: String,
  quantity: Number,
  price: Number,
  stock: Number,
  description: String,
  picture: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const cartSchema = new mongoose.Schema({
  items: {
    type: [cartItemSchema],
    required: true,
  },
  owner: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("carts", cartSchema);
