import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: ICartSlice = {
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IGrocery>) => {
      state.cartData.push(action.payload);
    },
    // here we are only sending or receiving item's id in payload action and finding item in cartdata and we will inject this increaseQuantity reducer in plus icon in groceryItemcard
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id == action.payload);
      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id == action.payload);
      if (item?.quantity && item.quantity > 1) {
        item.quantity--;
      } else {
        // filter() keeps elements that return true, and removes elements that return false.
        state.cartData = state.cartData.filter((i) => i._id != action.payload);
      }
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
