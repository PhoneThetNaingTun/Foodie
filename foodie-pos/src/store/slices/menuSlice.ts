import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";

interface Menu {
  id: number;
  name: string;
  price: number;
}

interface MenuSlice {
  menus: Menu[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload;
    },
    addMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = [...state.menus, action.payload];
    },
    deleteMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = state.menus.filter((menu) => {
        menu.id === action.payload.id ? false : true;
      });
    },
  },
});

export const { setMenu, addMenu, deleteMenu } = menuSlice.actions;

export default menuSlice.reducer;
