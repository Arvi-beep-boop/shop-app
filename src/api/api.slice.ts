import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../types/Product";
import { ProductQueryParams } from "../types/ProductQueryParams";
import { Category } from "../types/Category";

// Define a service using a base URL and expected endpoints
export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/v1/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], ProductQueryParams>({
      query: (params) => ({
        url: "products",
        params,
      }),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "categories",
    }),
  }),
});
