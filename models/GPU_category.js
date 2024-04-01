import mongoose from "mongoose";

const GPUCategorySchema = new mongoose.Schema(
  {
    brand: String,
    gpu: String,
    tdp: Number,
    vram: Number,
  },
  { collection: "gpu_category" }
);

const GPUCategory =
  mongoose.models.GPUCategory ||
  mongoose.model("GPUCategory", GPUCategorySchema);

export default GPUCategory;
