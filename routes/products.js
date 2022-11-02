const express = require("express");
const productSchema = require("../model/schemas/productSchema");

const router = express.Router();

router.get("/", (req, res) => {
  // const product = new productSchema({
  //   title: "Product",
  //   price: 42,
  //   description: "Product description",
  //   stock: 1,
  //   picture: "",
  // });
  // product.save();
  // res.send();
});

module.exports = router;
