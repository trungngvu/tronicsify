import nc from "next-connect";
import auth from "@/middleware/auth";
import Cart from "@/models/Cart";
import db from "@/utils/db";

const handler = nc().use(auth);

// Create a new cart
handler.post(async (req, res) => {
  const { products } = req.body;
  const userId = req.user;
  await db.connectDb();
  try {
    const cart = new Cart({ user: userId, products });
    await cart.save();
    await cart.populate({
      path: "products",
      populate: [{ path: "cpu" }, { path: "gpu" }],
    });
    await db.disconnectDb();
    res.status(201).json(cart);
  } catch (error) {
    await db.disconnectDb();
    res.status(500).json({ message: "Failed to create cart", error });
  }
});

// Get all carts for a user
handler.get(async (req, res) => {
  const userId = req.user;
  await db.connectDb();

  try {
    const carts = await Cart.find({ user: userId }).populate({
      path: "products",
      populate: [{ path: "cpu" }, { path: "gpu" }],
    });

    await db.disconnectDb();
    res.status(200).json(carts);
  } catch (error) {
    await db.disconnectDb();
    res.status(500).json({ message: "Failed to retrieve carts", error });
  }
});

export default handler;
