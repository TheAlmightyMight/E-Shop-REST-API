const mongoose = require("mongoose");

const Cookie = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true,
    },
    ownerRole: {
      type: String,
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

Cookie.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

module.exports = mongoose.model("cookies", Cookie);
