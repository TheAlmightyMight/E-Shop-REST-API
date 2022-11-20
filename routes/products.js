const express = require("express");
const productModel = require("../model/schemas/productSchema").productModel;
const createError = require("http-errors");
const auth = require("../middleware/isAuthenticated");

console.log(productModel);

const router = express.Router();

router.all("/", auth);
router.all("/", (req, res, next) => {
  console.log(req.role);
  next();
});

router.get("/", (req, res) => {
  try {
    productModel
      .find()
      .lean()
      .exec((err, products) => {
        try {
          if (err) {
            createError(500);
          } else {
            res.json(products);
          }
        } catch (err) {
          console.error(err.message);
        }
      });
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", express.json(), (req, res) => {
  try {
    const product = new productModel(req.body);
    product.save();
    res.status(201).end();
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", (req, res) => {
  productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {},
    (err, product) => {
      try {
        if (err) {
          createError(500);
        } else {
          res.status(200).end();
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  productModel
    .find({ _id: req.params.id })
    .lean()
    .exec((err, products) => {
      try {
        if (err) {
          createError(500);
        } else {
          res.json(products);
        }
      } catch (err) {
        console.error(err.message);
      }
    });
});

router.delete("/:id", (req, res) => {
  try {
    productModel.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        createError(500, err);
      } else {
        res.status(200).end();
      }
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
