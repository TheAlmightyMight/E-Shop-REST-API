const express = require("express");
const userSchema = require("../model/schemas/userSchema");

const router = express.Router();

// SignUp logic
router.post("/", async (req, res, next) => {
  const { email, password, name, surname, role } = req.body;
  try {
    const user = await userSchema.signUp(email, password, name, surname, role);
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

module.exports = router;
