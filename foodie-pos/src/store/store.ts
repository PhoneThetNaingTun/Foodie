import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./slices/menuSlice";
import SnackBarReducer from "./slices/AppSnackBar";
import AppReducer from "./slices/AppSlice";
import MenuCategoryReducer from "./slices/menuCategorySlice";
import CompanyReducer from "./slices/CompanySlice";
import MenuMenuCategoryReducer from "./slices/MenuMenuCategory";
import LocationReducer from "./slices/locationSlice";
import DisableLocationMenuCategoryReducer from "./slices/DisableLocationMenuCategorySlice";

export const store = configureStore({
  reducer: {
    App: AppReducer,
    Company: CompanyReducer,
    Location: LocationReducer,
    MenuCategory: MenuCategoryReducer,
    DisableLocationMenuCategory: DisableLocationMenuCategoryReducer,
    Menu: MenuReducer,
    SnackBar: SnackBarReducer,
    MenuMenuCategory: MenuMenuCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
