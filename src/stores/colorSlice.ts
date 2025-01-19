import { createSlice } from "@reduxjs/toolkit";

// Retrieve initial state from localStorage or use a default value
const savedColor = localStorage.getItem("themedColor");
const initialState = savedColor ? JSON.parse(savedColor) : { value: { sideBar: "#234f58", playBar: "#234f58", content: '#121212', isRecommened: false } };
console.log(initialState);
const colorSlice = createSlice({
  name: "themedColor",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.value = {...state.value, ...action.payload};
      localStorage.setItem("themedColor", JSON.stringify(state));
    },
  },
});

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;
