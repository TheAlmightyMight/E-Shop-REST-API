const isAdmin = require("../utils/isAdmin");
const cookieModel = require("../model/schemas/cookie");

const isAuthenticated = (req, res, next) => {
  console.log(req.cookies);
  try {
    cookieModel.findOne({ session: req.cookies.id }, (err, cookie) => {
      if (err) {
        res.status(500).json({ reason: "Could not find cookie, db error" });
      } else if (!cookie) {
        res.status(401).end();
      } else {
        if (isAdmin(cookie, res)) {
          req.role = "admin";
        } else {
          req.role = "user";
        }
        next();
      }
    });
  } catch (err) {
    res.status(500).end();
    console.error(err.message, err);
  }
};

module.exports = isAuthenticated;
