const isAdmin = async (cookie, res) => {
  try {
    if (cookie.ownerRole === "admin") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    res.status(500).end();
    console.error(err.message, err);
  }
};

module.exports = isAdmin;
