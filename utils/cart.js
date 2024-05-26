import axios from "axios";
import {
  addCart,
  updateCart,
  setCarts,
  setActiveCart,
  removeCart,
} from "@/redux/slices/CartSlice";

const API_URL = "/api/cart"; // Replace with your API URL

export const createCart = (cart) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, cart);
    dispatch(addCart(response.data));
    dispatch(setActiveCart(response.data._id));
  } catch (error) {
    console.error("Failed to create cart", error);
  }
};

export const addProductToCart = (cartId, product) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/${cartId}`, product);
    console.log(response.data);
    dispatch(updateCart(response.data)); // Update the Redux state with the updated cart
  } catch (error) {
    console.error("Failed to add product to cart", error);
  }
};

export const deleteCart = (cartId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${cartId}`);
    dispatch(removeCart(cartId));
  } catch (error) {
    console.error("Failed to delete cart", error);
  }
};

export const toggleSharable = (cartId) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${cartId}`
    );
    dispatch(updateCart(response.data));
  } catch (error) {
    console.error("Failed to toggle sharable field", error);
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
