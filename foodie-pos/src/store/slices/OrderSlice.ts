import { config } from "@/config";
import {
  RefreshOrderOptions,
  UpdateOrderOptions,
  createOrderOptions,
  orderSlice,
} from "@/type/order";
import { Order } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { emptyCart } from "./CartSlice";

const initialState: orderSlice = {
  item: [],
  isLoading: false,
  err: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (options: createOrderOptions, thunkApi) => {
    const { tableId, cartItems, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.orderAppApiUrl}/order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tableId, cartItems }),
      });
      const { orders } = await response.json();
      thunkApi.dispatch(emptyCart());
      thunkApi.dispatch(setOrder(orders));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (options: UpdateOrderOptions, thunkApi) => {
    const { itemId, status, onSuccess, onError } = options;
    try {
      thunkApi.dispatch(setIsLoading(true));
      const response = await fetch(
        `${config.backOfficeApi}/order?itemId=${itemId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const { orders } = await response.json();
      thunkApi.dispatch(setOrder(orders));
      thunkApi.dispatch(setIsLoading(false));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);
export const refreshOrder = createAsyncThunk(
  "order/refreshOrder",
  async (options: RefreshOrderOptions, thunkApi) => {
    const { orderSeq, onSuccess, onError } = options;
    try {
      thunkApi.dispatch(setIsLoading(true));
      const response = await fetch(
        `${config.orderAppApiUrl}/order?orderSeq=${orderSeq}`
      );
      const { orders } = await response.json();
      thunkApi.dispatch(orders(orders));
      thunkApi.dispatch(setIsLoading(false));
      onSuccess && onSuccess(orders);
    } catch (err) {
      onError && onError();
    }
  }
);
const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order[]>) => {
      state.item = action.payload;
    },
  },
});

export const { setOrder, setIsLoading } = OrderSlice.actions;
export default OrderSlice.reducer;
