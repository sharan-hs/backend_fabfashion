const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mySecret = process.env.MONGODB_URI;

mongoose
  .connect(mySecret)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
  });
