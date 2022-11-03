const express = require("express");
const productSchema = require("../model/schemas/productSchema");
const createError = require("http-errors");

const router = express.Router();

router.all("/", express.json(), (req, res, next) => {
  //auth
  console.log(req.body);
  next();
});

router.get("/", (req, res) => {
  try {
    const products = productSchema
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
    // console.log(req.body);
    const product = new productSchema(req.body);
    product.save();
    res.status(201).end();
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", (req, res) => {
  productSchema.findByIdAndUpdate(
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
  const products = productSchema
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
    productSchema.findByIdAndDelete(req.params.id, (err) => {
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
