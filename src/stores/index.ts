import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "@/stores/colorSlice";
import statusSlice from "./statusSlice";

const store = configureStore({
  reducer: {
    color: colorReducer,
    status: statusSlice
  }
})

export default store;
