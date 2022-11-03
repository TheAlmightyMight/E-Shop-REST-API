const mongoose = require("mongoose");

class DataBase {
  connect(options = {}) {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, options, (err) => {
      try {
        if (err) {
          throw err;
        } else {
          console.log("Connected");
        }
      } catch (err) {
        console.error("Having trouble connecting to MongoDB", err.message);
      }
    });
  }
}
