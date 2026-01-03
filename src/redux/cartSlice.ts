import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface IGrocery {
  _id: string;
  name: string;
  category: string;
  price: string;
  unit: string;
  quantity: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ICartSlice {
  cartData: IGrocery[];
  subTotal: number;
  deliveryFee: number;
  finalTotal: number;
}

const initialState: ICartSlice = {
  cartData: [],
  subTotal: 0,
  deliveryFee: 40,
  finalTotal: 40,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IGrocery>) => {
      state.cartData.push(action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    // here we are only sending or receiving item's id in payload action and finding item in cartdata and we will inject this increaseQuantity reducer in plus icon in groceryItemcard
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id == action.payload);
      if (item) {
        item.quantity++;
      }
      cartSlice.caseReducers.calculateTotals(state);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id == action.payload);
      if (item?.quantity && item.quantity > 1) {
        item.quantity--;
      } else {
        // filter() keeps elements that return true, and removes elements that return false.
        state.cartData = state.cartData.filter((i) => i._id != action.payload);
      }
      cartSlice.caseReducers.calculateTotals(state);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.cartData = state.cartData.filter((i) => i._id != action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    // we will call this calculateTotals reducer in every other reducer written above so that it automatically calculates the values
    calculateTotals: (state) => {
      state.subTotal = state.cartData.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );
      state.deliveryFee = state.subTotal > 500 ? 0 : 40;
      state.finalTotal = state.subTotal + state.deliveryFee;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
