const express = require("express");
const userSchema = require("../model/schemas/userSchema");
const loginUser = require("../middleware/userLogIn");

const router = express.Router();

// SignUp logic
router.post("/", async (req, res) => {
  const { email, password, name, surname, role } = req.body;
  try {
    const user = await userSchema.signUp(email, password, name, surname, role);
    if (user) {
      loginUser(user, res);
    } else {
      throw new Error("Could not create user");
    }
  } catch (err) {
    console.error(err.message);
    res.json({ msg: err.message });
  }
});

module.exports = router;
