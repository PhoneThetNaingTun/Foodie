import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    Menu: MenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
