import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./slices/menuSlice";
import SnackBarReducer from "./slices/AppSnackBar";

export const store = configureStore({
  reducer: {
    Menu: MenuReducer,
    SnackBar: SnackBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
