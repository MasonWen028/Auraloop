import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "@/stores/slices/colorSlice";
import statusSlice from "./slices/statusSlice";
import dataSlice from './slices/dataSlicce';
import countryCodeSlice from "./slices/countryCodeSlice";
import musicSlice from "./slices/musicSlice";

const store = configureStore({
  reducer: {
    color: colorReducer,
    status: statusSlice,
    data: dataSlice,
    countries: countryCodeSlice,
    music: musicSlice
  }
})

export default store;
