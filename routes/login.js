const router = require("express").Router();
const createError = require("http-errors");
const userModel = require("../model/schemas/userSchema");
const Cookies = require("../utils/cookie-setter");
const cookieModel = require("../model/schemas/cookie");

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    if (user) {
      const cookie = new Cookies({
        expires: Date.now() + 86400000,
        role: "user",
      });

      const model = new cookieModel({ session: cookie.value });

      model.save((err) => {
        if (err) {
          throw createError(500);
        }
      });

      res.setHeader("Set-cookie", cookie.formatAsString());
      res.end("Successfully logged in");
    } else {
      res.end("No such user with the provided credentials");
    }
  } catch (err) {
    console.error(err.message, err);
    res.status(err.status).end(err.message);
    next();
  }
});

module.exports = router;
