import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dialogReducer from "./slices/DialogSlice";
import cartReducer from "./slices/CartSlice";
import wishReducer from "./slices/WishSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  dialog: dialogReducer,
  cart: cartReducer,
  wish: wishReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
