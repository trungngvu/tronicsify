import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";
import axios from "axios";
import mongoose from "mongoose";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { q: query } = req.body;

    const handleAI = async (search) => {
      const { data } = await axios.post(process.env.SIMILARITY_ENDPOINT, {
        input: {
          query: search,
        },
      });
      const res = data.output.split(" ");
      res.pop();
      return res;
    };

    const result = await handleAI(query);
    await db.connectDb();
    const prods =
      result.length > 0
        ? await Product.find({
            _id: {
              $in: result.map((item) => new mongoose.Types.ObjectId(item)),
            },
          }).select(
            "imgs price slug title availability category sub_category url buildable"
          )
        : [];
    await db.disconnectDb();
    return res.json(prods);
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
});

export default handler;
