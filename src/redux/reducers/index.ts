import { combineReducers } from "@reduxjs/toolkit";
import { reducer as cityReducer } from "../slices/citySlice";
import { cityApi } from "../api/cityApi";

export const reducers = combineReducers({
  cityReducer,
  [cityApi.reducerPath]: cityApi.reducer,
});

export type ReducersType = ReturnType<typeof reducers>;
