import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema(
  {
    products: [],
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
