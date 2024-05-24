import nc from "next-connect";
import auth from "@/middleware/auth";
import Cart from "@/models/Cart";
import db from "@/utils/db";

const handler = nc().use(auth);
// Update an existing cart
handler.put(async (req, res) => {
  const { id } = req.query;
  const { products } = req.body;
  await db.connectDb();

  try {
    const cart = await Cart.findByIdAndUpdate(id, { products }, { new: true });
    await db.disconnectDb();

    res.status(200).json(cart);
  } catch (error) {
    await db.disconnectDb();
    res.status(500).json({ message: "Failed to update cart", error });
  }
});

handler.post(async (req, res) => {
  const { id } = req.query;
  const product = req.body;

  await db.connectDb();
  try {
    // Find the cart by ID
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Add the product to the cart
    cart.products.push(product);
    // Save the updated cart
    await cart.save();
    await db.disconnectDb();
    res.status(200).json(cart);
  } catch (error) {
    await db.disconnectDb();
    res.status(500).json({ message: "Failed to add product to cart", error });
  }
});

export default handler;