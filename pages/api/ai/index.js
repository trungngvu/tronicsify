import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";
import axios from "axios";
import mongoose from "mongoose";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { q: query } = req.body;
    const formatText = (text) => {
      // Extract MongoDB document IDs
      if (text === "") return "";
      const regex = /id:([0-9a-f]{24})/g;
      const ids = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        ids.push(match[1]);
      }
      // Remove "id:<mongo_id>" from the text
      let formattedText = text.replace(/id:[0-9a-f]{24}/g, "");

      // Replace * with bullet points
      formattedText = formattedText.replace(/\*/g, "&nbsp;&nbsp;&nbsp;•");

      formattedText = formattedText.replace(/(\d+)(₫|đ|VND)/g, (match) => {
        // Remove any non-numeric characters
        const numericValue = match.replace(/[^\d]/g, "");
        // Format numeric value with commas for thousands separator
        const formattedValue = parseInt(numericValue).toLocaleString();
        // Add the currency symbol
        return `${formattedValue}₫`;
      });

      // Replace **word** with bold text
      formattedText = formattedText.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
      );
      // Replace \n with <br> for new lines
      formattedText = formattedText.replace(/\n/g, "<br>");

      return [formattedText, ids];
    };

    const handleAI = async (search) => {
      const { data } = await axios.post(process.env.AI_ENDPOINT, {
        input: {
          question: search,
        },
      });
      return formatText(data.output.content);
    };

    const result = await handleAI(query);
    await db.connectDb();
    const prods =
      result[1].length > 0
        ? await Product.find({
            _id: {
              $in: result[1].map((item) => new mongoose.Types.ObjectId(item)),
            },
          }).select("imgs price slug title availability category sub_category url")
        : [];
    await db.disconnectDb();
    return res.json({
      res: result[0],
      prods,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, res: "error" });
  }
});

export default handler;
