import { cartItem, cartSlice } from "@/type/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: cartSlice = {
  isLoading: false,
  items: [],
  err: null,
};
export const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addItemtoCart: (state, action: PayloadAction<cartItem>) => {
      const exist = state.items.find((item) => item.id === action.payload.id);
      if (exist) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      } else {
        state.items = [...state.items, action.payload];
      }
    },
    removeItemFromCart: (state, action: PayloadAction<cartItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemtoCart, removeItemFromCart, emptyCart } =
  CartSlice.actions;

export default CartSlice.reducer;
