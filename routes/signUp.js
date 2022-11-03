const express = require("express");
const userSchema = require("../model/schemas/userSchema");
const createError = require("http-errors");

const router = express.Router();

router.all("/", (req, res, next) => {
  express.urlencoded({ extended: false });
  console.log(req.body);
  next();
});

// SignUp logic

router.post("/", (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    userSchema.signUp(email, password);
    res.status(200).end();
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
