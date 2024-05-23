import nc from "next-connect";
import auth from "@/middleware/auth";
import Cart from "@/models/Cart";

const handler = nc().use(auth);
// Update an existing cart
handler.put(async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  try {
    const cart = await Cart.findByIdAndUpdate(id, { products }, { new: true });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart", error });
  }
});
