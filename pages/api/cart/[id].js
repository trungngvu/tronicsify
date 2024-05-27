import nc from "next-connect";
import auth from "@/middleware/auth";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import Product from "@/models/Product";
import GPUCategory from "@/models/GPU_category";
import CPUCategory from "@/models/CPU_category";

const handler = nc().use(auth);
// Update an existing cart
handler.put(async (req, res) => {
  const { id } = req.query;
  const { products } = req.body;
  await db.connectDb();

  try {
    const cart = await Cart.findByIdAndUpdate(id, { products }, { new: true });
    await cart.populate({
      path: "products",
      model: Product,
      populate: [
        { path: "cpu", model: CPUCategory },
        { path: "gpu", model: GPUCategory },
      ],
    });
    await db.disconnectDb();
    return res.status(200).json(cart);
  } catch (error) {
    await db.disconnectDb();
    return res.status(500).json({ message: "Failed to update cart", error });
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
    await cart.populate({
      path: "products",
      model: Product,
      populate: [
        { path: "cpu", model: CPUCategory },
        { path: "gpu", model: GPUCategory },
      ],
      select: "imgs price slug title availability category sub_category",
    });

    await db.disconnectDb();
    return res.status(200).json(cart);
  } catch (error) {
    await db.disconnectDb();
    return res
      .status(500)
      .json({ message: "Failed to add product to cart", error });
  }
});

handler.patch(async (req, res) => {
  const { id } = req.query;

  await db.connectDb();
  try {
    // Find the cart by ID
    const cart = await Cart.findById(id);
    if (!cart) {
      await db.disconnectDb();
      return res.status(404).json({ message: "Cart not found" });
    }

    // Toggle the sharable field
    cart.sharable = !cart.sharable;

    // Save the updated cart
    await cart.save();
    await cart.populate({
      path: "products",
      model: Product,
      populate: [
        { path: "cpu", model: CPUCategory },
        { path: "gpu", model: GPUCategory },
      ],
      select: "imgs price slug title availability category sub_category",
    });
    await db.disconnectDb();
    return res.status(200).json(cart);
  } catch (error) {
    await db.disconnectDb();
    return res
      .status(500)
      .json({ message: "Failed to toggle sharable field", error });
  }
});
handler.delete(async (req, res) => {
  const { id } = req.query;

  await db.connectDb();
  try {
    // Find the cart by ID and delete it
    const cart = await Cart.findByIdAndDelete(id);

    if (!cart) {
      await db.disconnectDb();
      return res.status(404).json({ message: "Cart not found" });
    }

    await db.disconnectDb();
    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    await db.disconnectDb();
    return res.status(500).json({ message: "Failed to delete cart", error });
  }
});
export default handler;
