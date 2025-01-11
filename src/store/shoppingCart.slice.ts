import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

type ProductId = number;

interface ShoppingCartState {
  items: Record<ProductId, Product>;
}

const initialState: ShoppingCartState = {
  items: {},
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    add: (state, { payload: product }: PayloadAction<Product>) => {
      state.items[product.id] = product;
    },
    remove: (state, { payload: productId }: PayloadAction<ProductId>) => {
        delete state.items[productId]
    },
  },
});
