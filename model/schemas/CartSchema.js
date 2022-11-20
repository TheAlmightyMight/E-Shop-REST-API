const mongoose = require("mongoose");
const productSchema = require("./productSchema").productSchema;

const cartSchema = new mongoose.Schema(
  {
    items: {
      type: [productSchema],
      required: true,
    },
    owner: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carts", cartSchema);
