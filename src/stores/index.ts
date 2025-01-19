import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "@/stores/colorSlice";

const store = configureStore({
  reducer: {
    color: colorReducer
  }
})

export default store;
