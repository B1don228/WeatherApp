import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICityResponse } from "../../utils/types/city";
import { ITempResponse } from "../../utils/types/temperature";

const baseUrl = process.env.REACT_CITY_URL;

export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    validateCity: builder.mutation<ICityResponse, string>({
      query: (city) =>
        `weather?appid=6b26cf64f6aa8c52267d30f3cfb5d3e5&q=${city}`,
    }),
    getCity: builder.query<ICityResponse, string>({
      query: (city) =>
        `weather?appid=6b26cf64f6aa8c52267d30f3cfb5d3e5&q=${city}`,
    }),
    getTemperatureCity: builder.query<ITempResponse, string>({
      query: (city) =>
        `forecast?appid=6b26cf64f6aa8c52267d30f3cfb5d3e5&cnt=16&q=${city}`,
    }),
  }),
});

export const {
  useValidateCityMutation,
  useGetCityQuery,
  useGetTemperatureCityQuery,
} = cityApi;
