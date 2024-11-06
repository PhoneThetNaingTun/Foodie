import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./slices/menuSlice";
import SnackBarReducer from "./slices/AppSnackBar";
import AppReducer from "./slices/AppSlice";
import MenuCategoryReducer from "./slices/menuCategorySlice";
import CompanyReducer from "./slices/CompanySlice";
import MenuMenuCategoryReducer from "./slices/MenuMenuCategorySlice";
import LocationReducer from "./slices/locationSlice";
import DisableLocationMenuCategoryReducer from "./slices/DisableLocationMenuCategorySlice";
import DisableLocationMenuReducer from "./slices/DisableLocationMenuSlice";
import AddonCategoryReducer from "./slices/AddonCategorySlice";
import MenuAddonCategoryReducer from "./slices/MenuAddonCategorySlice";
import AddonReducer from "./slices/AddonSlice";
import TableReducer from "./slices/TableSlice";
import CartReducer from "./slices/CartSlice";
import OrderReducer from "./slices/OrderSlice";

export const store = configureStore({
  reducer: {
    App: AppReducer,
    Company: CompanyReducer,
    Location: LocationReducer,
    MenuCategory: MenuCategoryReducer,
    DisableLocationMenuCategory: DisableLocationMenuCategoryReducer,
    DisableLocationMenu: DisableLocationMenuReducer,
    Menu: MenuReducer,
    Addon: AddonReducer,
    AddonCategory: AddonCategoryReducer,
    MenuAddonCategory: MenuAddonCategoryReducer,
    Table: TableReducer,
    SnackBar: SnackBarReducer,
    MenuMenuCategory: MenuMenuCategoryReducer,
    Cart: CartReducer,
    Order: OrderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
