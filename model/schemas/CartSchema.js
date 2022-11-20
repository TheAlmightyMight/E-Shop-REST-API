const mongoose = require("mongoose");
const productSchema = require("./productSchema").productSchema;

const cartSchema = new mongoose.Schema(
  {
    items: {
      type: [productSchema],
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("carts", cartSchema);
