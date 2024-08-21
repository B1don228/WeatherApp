import { createSlice } from "@reduxjs/toolkit";

interface IState {
  cities: { id: number; city: string }[];
  searchValue: string;
}

const initialState: IState = {
  cities: localStorage.getItem("current_cities")
    ? JSON.parse(localStorage.getItem("current_cities")!)
    : [],
  searchValue: "",
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    addCity: (state, { payload }) => {
      if (
        !state.cities.find(
          ({ city }) => city.toLowerCase() === payload.city.toLowerCase()
        )
      ) {
        state.cities.push(payload);
        localStorage.removeItem("current_cities");
        localStorage.setItem("current_cities", JSON.stringify(state.cities));
      }
    },
    removeCity: (state, { payload }) => {
      state.cities = state.cities.filter(({ city }) => city !== payload);
      localStorage.removeItem("current_cities");
      localStorage.setItem("current_cities", JSON.stringify(state.cities));
    },
    changeSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
  },
});

export const { actions, reducer } = citySlice;
