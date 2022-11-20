const router = require("express").Router();
const userModel = require("../model/schemas/userSchema");
const loginUser = require("../middleware/userLogIn");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    if (user) {
      loginUser(user, res);
    } else {
      res.json("No such user with the provided credentials");
    }
  } catch (err) {
    console.error(err.message, err);
    res.status(err.status).end(err.message);
  }
});

module.exports = router;
