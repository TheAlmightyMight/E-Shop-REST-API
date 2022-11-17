const mongoose = require("mongoose");

const Cookie = new mongoose.Schema(
  {
    session: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

Cookie.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

module.exports = mongoose.model("cookies", Cookie);
