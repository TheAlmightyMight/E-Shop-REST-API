const express = require("express");
const productModel = require("../model/schemas/productSchema").productModel;
const auth = require("../middleware/isAuthenticated");

const router = express.Router();

router.all("/", auth);

router.get("/", (req, res) => {
  try {
    productModel
      .find()
      .lean()
      .exec((err, products) => {
        try {
          if (err) {
            throw new Error("DB error");
          } else {
            res.json(products);
          }
        } catch (err) {
          console.error(err.message);
        }
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.role);
    if (req.role === "admin") {
      const product = new productModel(req.body);
      await product.save();
      res.status(201).end();
    } else {
      res.status(403).end();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    if (req.role === "admin") {
      productModel.findByIdAndUpdate(req.params.id, req.body, {}, (err) => {
        if (err) {
          throw new Error("DB error");
        } else {
          res.status(200).end();
        }
      });
    } else {
      res.status(403).end();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", (req, res) => {
  productModel
    .find({ _id: req.params.id })
    .lean()
    .exec((err, products) => {
      try {
        if (err) {
          throw new Error("DB error");
        } else {
          res.json(products);
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
      }
    });
});

router.delete("/:id", (req, res) => {
  try {
    if (req.role === "admin") {
      productModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
          throw new Error("DB error");
        } else {
          res.status(200).end();
        }
      });
    } else {
      res.status(403).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
