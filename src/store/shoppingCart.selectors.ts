import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const selectShoppingCart = (state: RootState) => state.shoppingCart;

export const selectShoppingCartItems = createSelector(
  selectShoppingCart,
  (state) => Object.values(state.items)
);

export const selectIsItemInShoppingCart = createSelector(
  [selectShoppingCart, (_, productId: number) => productId],
  (state, productId) => Boolean(state.items[productId])
);

export const selectTotalPriceShoppingCart = createSelector(
  selectShoppingCartItems,
  (items) =>
    items.reduce((total, item) => {
      return total + item.price;
    }, 0)
);
