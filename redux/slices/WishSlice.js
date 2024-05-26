import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishes: [],
};

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addWish(state, action) {
      state.wishes.push(action.payload);
    },
    removeWish(state, action) {
      state.wishes = state.wishes.filter(
        (wish) => wish.product !== action.payload
      );
    },
    setWishes(state, action) {
      state.wishes = action.payload;
    },
  },
});

export const { addWish, removeWish, setWishes } = wishSlice.actions;

export default wishSlice.reducer;
