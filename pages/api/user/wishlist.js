import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";
import mongoose from "mongoose";

const handler = nc().use(auth);

// Add to wishlist endpoint
handler.post(async (req, res) => {
  const { productId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(req.user) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(400).send("Invalid user or product ID");
  }

  await db.connectDb();
  try {
    const user = await User.findById(req.user);
    if (!user) {
      await db.disconnectDb();
      return res.status(404).send("User not found");
    }

    user.wishlist.push({ product: productId });
    await user.save();
    await db.disconnectDb();
    res
      .status(200)
      .json(
        user.wishlist.find((prod) => prod.product.toString() === productId)
      );
  } catch (error) {
    await db.disconnectDb();
    res.status(500).send("Server error");
  }
});

// Remove from wishlist endpoint
handler.delete(async (req, res) => {
  const { productId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(req.user) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(400).send("Invalid user or product ID");
  }
  await db.connectDb();
  try {
    const user = await User.findById(req.user);
    if (!user) {
      await db.disconnectDb();
      return res.status(404).send("User not found");
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();
    await db.disconnectDb();
    res.status(200).json(user.wishlist);
  } catch (error) {
    await db.disconnectDb();
    res.status(500).send("Server error");
  }
});

handler.get(async (req, res) => {
  await db.connectDb();
  try {
    const user = await User.findById(req.user);
    await db.disconnectDb();
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    await db.disconnectDb();
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default handler;
