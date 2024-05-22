import nc from "next-connect";
import Product from "@/models/Product";
import auth from "@/middleware/auth";

const handler = nc().use(auth);

// Like a review
handler.post(async (req, res) => {
  try {
    const { prodID: productId, id: reviewId } = req.query;
    const userId = req.user;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return res.status(404).send("Review not found");
    }

    const alreadyLiked = review.likes.includes(userId);
    if (alreadyLiked) {
      review.likes.pull(userId);
    } else {
      review.likes.push(userId);
    }

    await product.save();

    return res
      .status(200)
      .json({ likes: review.likes.length, likedByUser: !alreadyLiked });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

export default handler;
