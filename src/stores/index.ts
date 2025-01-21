import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "@/stores/colorSlice";
import statusSlice from "./statusSlice";
import dataSlice from './dataSlicce';

const store = configureStore({
  reducer: {
    color: colorReducer,
    status: statusSlice,
    data: dataSlice,
  }
})

export default store;
