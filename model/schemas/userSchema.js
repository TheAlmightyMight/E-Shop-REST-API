const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cartModel = require("./cartSchema");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  surname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  profilePic: {
    default: "",
    type: String,
  },
  role: {
    required: true,
    type: String,
    default: "user",
  },
});

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("No such user with this email");
  }

  const result = await bcrypt.compare(password, user.password);

  if (result) {
    return user;
  } else {
    throw Error("Could not compare password");
  }
};

userSchema.statics.signUp = async function (
  email,
  password,
  name,
  surname,
  role
) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name: name,
    surname: surname,
    email: email,
    password: hash,
    role: role,
  });

  await cartModel.create({ items: [], owner: user._id });

  return user;
};

module.exports = mongoose.model("users", userSchema);
