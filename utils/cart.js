import axios from "axios";
import { addToCart, updateCart, setCarts } from "@/redux/slices/CartSlice";

const API_URL = "/api/cart"; // Replace with your API URL

export const createCart = (cart) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, cart);
    dispatch(addToCart(response.data));
  } catch (error) {
    console.error("Failed to create cart", error);
  }
};

export const updateCartInDatabase = (cartId, cartItems) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${cartId}`, {
      products: cartItems,
    });
    dispatch(updateCart(response.data));
  } catch (error) {
    console.error("Failed to update cart in database", error);
  }
};

export const fetchCarts = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(setCarts(response.data));
  } catch (error) {
    console.error("Failed to fetch carts", error);
  }
};
