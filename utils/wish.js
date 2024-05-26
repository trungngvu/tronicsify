import axios from "axios";
import { addWish, removeWish, setWishes } from "@/redux/slices/WishSlice"; // Adjust the path to your Redux slice as necessary

export const addWishToDB = (productId) => async (dispatch) => {
  try {
    const response = await axios.post("/api/user/wishlist", { productId });
    dispatch(addWish(response.data));
  } catch (error) {
    console.error("Failed to add wishlist item", error);
  }
};

export const removeWishFromDB = (productId) => async (dispatch) => {
  try {
    await axios.delete("/api/user/wishlist", {
      data: { productId },
    });
    dispatch(removeWish(productId));
  } catch (error) {
    console.error("Failed to remove wishlist item", error);
  }
};

export const fetchWishlistFromDB = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/user/wishlist`);
    dispatch(setWishes(response.data));
  } catch (error) {
    console.error("Failed to fetch wishlist", error);
  }
};
