const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: String,
    street: String,
    city: String,
    state: String,
    pincode: Number,
    country: String,
    phone: Number,
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
