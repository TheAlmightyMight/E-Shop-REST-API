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
        console.log(cookie.ownerRole, "role");
        if (cookie.ownerRole === "admin") {
          req.role = "admin";
        } else if (cookie.ownerRole === "user") {
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
