var express = require("express");
var router = express.Router();
const cartSchema = require("../model/schemas/cartSchema");

router.all("/", function (req, res, next) {
  express.query();
  next();
});

router.post("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const cart = await cartSchema.findOne({ owner: id });
    console.log(cart);
    const exists = cart.items.find((el) => el.title === req.body.title);
    if (exists) {
      throw new Error("Item is already present in the cart");
    }
    cart.items.push(req.body);
    await cart.save();
    res.json({ msg: "Success" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const cart = await cartSchema.findOne({ owner: id });
    res.json({ items: cart?.items });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const cart = await cartSchema.findOne({ owner: id });

    console.log(cart.items[0]._id, req.query.itemId);
    cart.items = cart.items.filter(
      (el) => el._id.toString() !== req.query.itemId
    );
    await cart.save();
    res.json({ msg: "Success" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const cart = await cartSchema.findOne({ owner: id });
    cart.items = cart.items.map((el) => {
      if (el._id.toString() === req.query.itemId) {
        return { ...req.body, _id: req.query.itemId };
      }
    });
    console.log(cart.items);
    await cart.save();
    res.json({ msg: "Success" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
