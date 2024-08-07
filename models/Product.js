import mongoose from "mongoose";
import reviewSchema from "./Review";
const { ObjectId } = mongoose.Schema;

export const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
  },
  short_specs: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  long_specs: {
    type: String,
  },
  warranty: {
    type: String,
  },
  brand: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  reviews: [reviewSchema],
  imgs: [{ type: String }],
  price: { type: Number, required: true },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  updatedAt: { type: String, required: true },
  cpu: {
    type: ObjectId,
    ref: "CPUCategory",
  },
  gpu: {
    type: ObjectId,
    ref: "GPUCategory",
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
