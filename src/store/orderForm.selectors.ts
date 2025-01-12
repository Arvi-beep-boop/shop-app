import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const selectOrderForm = (state: RootState) => state.orderForm;

export const selectShippingData = createSelector(selectOrderForm, (state) =>
  (state.shippingData)
);
