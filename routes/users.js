const express = require("express");
const productSchema = require("../model/schemas/productSchema");
const createError = require("http-errors");

const router = express.Router();

router.all("/", (req, res, next) => {
  //auth
  console.log(req.body);
  next();
});

// SignUp logic
