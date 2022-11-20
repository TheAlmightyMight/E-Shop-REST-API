const router = require("express").Router();
const Cookie = require("../model/schemas/cookie");

router.post("/", async (req, res) => {
  try {
    const { id } = req.cookies;
    if (id) {
      const cookie = await Cookie.findOne({ session: id });
      await cookie.delete();
      res.clearCookie();
      res.status(200).end();
    } else {
      res.json({ msg: "User wasn't logged in (no session)" });
    }
  } catch (err) {
    console.error(err.message, err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
