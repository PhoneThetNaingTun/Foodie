import { config } from "@/config";
import { Menu, NewMenuPayload } from "@/type/menu";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";

interface MenuSlice {
  menus: Menu[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (payload: NewMenuPayload) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/menu`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();
    const { menu } = dataFromServer;
    onSuccess && onSuccess();
    return menu;
  }
);

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
  extraReducers: (bulider) => {
    bulider
      .addCase(createMenu.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menus = [...state.menus, action.payload];
        state.isLoading = false;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        const err = new Error("error occured");
        state.error = err.message;
      });
  },
});

export const { setMenu, addMenu, deleteMenu } = menuSlice.actions;

export default menuSlice.reducer;
