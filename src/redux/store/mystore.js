import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slice/allListSlice";

const mystore = configureStore({
  reducer: {
    users: UserReducer,
  },
});

export default mystore;
