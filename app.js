// const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const mongoose = require("mongoose");

require("dotenv").config();

const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");

const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {}, (err) => {
  if (err) {
    console.error("Having trouble connecting to MongoDB", err.message);
    throw err;
  } else {
    console.log("Connected");
  }
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression({ threshold: 1024 }));
app.use(cookieParser());
app.use(
  cors({ origin: process.env.MODE === "dev" ? "*" : process.env.FRONTEND_URL })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/products", productsRouter);
app.use("/users", cartRouter);

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
