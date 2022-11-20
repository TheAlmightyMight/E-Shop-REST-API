const Cookies = require("../utils/cookie-setter");
const cookieModel = require("../model/schemas/cookie");

const loginUser = async (user, res) => {
  const cookie = new Cookies({
    expires: Date.now() + 86400000,
  });

  console.log(user.role, "the fucking role");

  const doc = cookieModel.create(
    {
      session: cookie.value,
      ownerRole: user.role,
    },
    (err) => {
      if (err) {
        res.json(createError(500));
        return;
      }
    }
  );

  res.setHeader("Set-cookie", cookie.formatAsString());
  res.end("Successfully logged in");
};

module.exports = loginUser;
