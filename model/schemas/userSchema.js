const mongoose = require("mongoose");

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

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  profilePic: String,
  favorites: [cartItemSchema],
  cart: [cartItemSchema],
});

module.exports = mongoose.model("users", userSchema);
