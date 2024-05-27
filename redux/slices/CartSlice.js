import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  activeCartId: null, // Track the active cart
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      state.carts.push(action.payload);
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
      if (!state.activeCartId && action.payload?.length > 0)
        state.activeCartId = action.payload[0]._id;
    },
    removeCart(state, action) {
      state.carts = state.carts.filter((cart) => cart._id !== action.payload);
      if (state.carts.length === 0) state.activeCartId = null;
    },
    setActiveCart(state, action) {
      state.activeCartId = action.payload; // Set the active cart ID
    },
    resetCart(state, action) {
      state = initialState;
    },
  },
});

export const {
  addCart,
  updateCart,
  setCarts,
  removeCart,
  setActiveCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
