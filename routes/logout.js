const router = require("express").Router();
const createError = require("http-errors");
const userModel = require("../model/schemas/userSchema");

router.post("/", async (req, res) => {
  try {
    const { _sid } = req.body.session;
    const user = await userModel.login(email, password);
    if (user) {
      console.log(user);
      res.end("Successfully logged in");
    } else {
      res.json("No such user with the provided credentials");
    }
  } catch (err) {
    console.error(err.message, err);
    createError(500);
  }
});

module.exports = router;
