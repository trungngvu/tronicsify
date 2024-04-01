import mongoose from "mongoose";

const CPUCategorySchema = new mongoose.Schema(
  {
    brand: String,
    core: Number,
    thread: Number,
    cpu: String,
    boost_clock: Number,
    base_clock: Number,
    socket: String,
    keyword: String,
    tdp: Number,
    iGPU: String,
  },
  { collection: "cpu_category" }
);

const CPUCategory =
  mongoose.models.CPUCategory ||
  mongoose.model("CPUCategory", CPUCategorySchema);

export default CPUCategory;
