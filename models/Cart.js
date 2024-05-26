import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    user: {
      type: ObjectId,
      ref: "User",
    },
    sharable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
