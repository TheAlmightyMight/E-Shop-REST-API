const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const db = require("./model/db");
const errorLogger = require("./middleware/errorHandler");

require("dotenv").config();

const productsRouter = require("./routes/products");
const signUpRouter = require("./routes/signUp");
const cartRouter = require("./routes/cart");
const loginRouter = require("./routes/login");
const logOutRouter = require("./routes/logout");

const app = express();
db.connect();

// app.use(logger(":method :url :status :remote-addr :user-agent"));
app.use(express.json());
app.use(cookieParser());
app.use(compression({ threshold: 1024 }));
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({ origin: process.env.MODE === "dev" ? "*" : process.env.FRONTEND_URL }),
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", loginRouter);
app.use("/logout", logOutRouter);
app.use("/products", productsRouter);
app.use("/signUp", signUpRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
