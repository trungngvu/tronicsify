import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";
// import { AutoTokenizer } from "@xenova/transformers";

const handler = nc();

handler.get(async (req, res) => {
  try {
    const { q: query, cat: category } = req.query;

    // Define a function for fuzzy search
    async function fuzzySearch(query) {
      try {
        // Split the query into individual words
        const words = query.trim().split(/\s+/);

        // Construct a regex pattern for fuzzy matching
        const regexPattern = words
          .map((word) => `(?=.*\\b${escapeRegExp(word)}\\b)`)
          .join("");
        const regex = new RegExp(`${regexPattern}`, "i");
        // Perform the search using regex
        const results = await Product.find({
          $or: [
            { title: { $regex: regex } }, // Fuzzy search on the 'name' field
            { short_specs: { $regex: regex } }, // Fuzzy search on the 'description' field
            // Add more fields as needed
          ],
          ...(category ? { category } : {}),
        })
          .limit(10)
          .select("title slug price imgs");
        // let tokenizer = await AutoTokenizer.from_pretrained(
        //   "sentence-transformers/all-MiniLM-L6-v2"
        // );
        // let inputs = await tokenizer("I love transformers!");
        // console.log(inputs);

        return results;
      } catch (error) {
        console.error("Error occurred during fuzzy search:", error);
        return []; // Return empty array in case of error
      }
    }

    // Function to escape special characters in the query for regex
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }

    let result = {};
    await fuzzySearch(query)
      .then((results) => {
        result = results;
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });

    return res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
