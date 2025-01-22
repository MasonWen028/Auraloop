import { CountryGroup } from "@/types/main";
import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";

// LocalForage instance for storing country data
const countryCodeDb = localforage.createInstance({
  name: "country-data",
  description: "List data of the application",
  storeName: "country",
});

// Initial data for the country groups
let initialState: CountryGroup[] = [];

// Async function to load user data from LocalForage
async function loadInitialData(): Promise<CountryGroup[]> {
  try {
    const data = await countryCodeDb.getItem<CountryGroup[]>("countryGroupData");
    if (data) {
      console.log("Loaded country data from DB:", data);
      return data;
    } else {
      console.log("No country data found in DB. Using initial data.");
      return initialState;
    }
  } catch (error) {
    console.error("Error loading data from countryCodeDb:", error);
    return initialState;
  }
}

// Load data and replace the initial state if found
await (async () => {
  const data = await loadInitialData();
  initialState = data;
})();

// Redux slice for managing countries
const countries = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries(state, action) {
      state.length = 0;
      state.push(...action.payload);
      try {
        countryCodeDb.setItem("countryGroupData", action.payload);
      } catch (error) {
        console.error("Error saving country data to DB:", error);
      }
    },
  },
});

// Export actions and reducer
export const { setCountries } = countries.actions;
export default countries.reducer;
