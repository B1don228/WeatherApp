import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../reducers";
import { cityApi } from "../api/cityApi";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaulMiddleware) =>
    getDefaulMiddleware().concat(cityApi.middleware),
});
