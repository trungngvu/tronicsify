import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  activeCartId: null, // Track the active cart
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.carts.findIndex(
        (cart) => cart._id === action.payload._id
      );
      if (index !== -1) {
        state.carts[index].push(action.payload);
      }
    },
    updateCart(state, action) {
      const index = state.carts.findIndex(
        (cart) => cart._id === action.payload._id
      );
      if (index !== -1) {
        state.carts[index] = action.payload;
      }
    },
    setCarts(state, action) {
      state.carts = action.payload;
    },
    removeCart(state, action) {
      state.carts = state.carts.filter((cart) => cart._id !== action.payload);
    },
    setActiveCart(state, action) {
      state.activeCartId = action.payload; // Set the active cart ID
    },
  },
});

export const { addToCart, updateCart, setCarts, removeCart, setActiveCart } =
  cartSlice.actions;

export default cartSlice.reducer;
