import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShippingData } from "../types/ShippingData";

interface OrderFormState {
  shippingData: ShippingData | null;
}

const initialState: OrderFormState = {
  shippingData: null,
};

export const orderFormSlice = createSlice({
  name: "orderForm",
  initialState,
  reducers: {
    submit: (state, { payload: shippingData }: PayloadAction<ShippingData>) => {
      state.shippingData = shippingData;
    },
  },
});
