const mongoose = require("mongoose");

const fashionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    sizes: [
      {
        type: String,
      },
    ],
    bestseller: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const FashionProducts = mongoose.model("FashionProducts", fashionSchema);

module.exports = FashionProducts;
