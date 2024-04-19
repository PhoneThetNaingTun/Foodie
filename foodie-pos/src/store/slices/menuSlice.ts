import { config } from "@/config";
import {
  DeleteMenuPayload,
  NewMenuPayload,
  UpdateMenuPayload,
} from "@/type/menu";
import { menu } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenuMenuCategory } from "./MenuMenuCategorySlice";
import { setDisableLocationMenu } from "./DisableLocationMenuSlice";

interface MenuSlice {
  menus: menu[];
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
  async (payload: NewMenuPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/menu`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });
    const dataFromServer = await response.json();
    const { menu, menuCategoryMenuId } = dataFromServer;

    onSuccess && onSuccess();
    return menu;
  }
);

export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async (payload: UpdateMenuPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/menu`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { menuMenuCategories, updatedMenu, disableLocationMenus } =
      dataFromServer;
    thunkApi.dispatch(replaceMenu(updatedMenu));
    thunkApi.dispatch(setDisableLocationMenu(disableLocationMenus));
    thunkApi.dispatch(setMenuMenuCategory(menuMenuCategories));
    onSuccess && onSuccess();
  }
);

export const DeleteMenu = createAsyncThunk(
  "menu/deleteMenu",
  async (payload: DeleteMenuPayload, thunkApi) => {
    const { onSuccess, id } = payload;
    await fetch(`${config.backOfficeApi}/menu?id=${id}`, {
      method: "DELETE",
    });
    onSuccess && onSuccess();
    thunkApi.dispatch(removeMenu(id));
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<menu[]>) => {
      state.menus = action.payload;
    },
    addMenu: (state, action: PayloadAction<menu>) => {
      state.menus = [...state.menus, action.payload];
    },
    removeMenu: (state, action: PayloadAction<Number>) => {
      state.menus = state.menus.filter((menu) =>
        menu.id === action.payload ? false : true
      );
    },
    replaceMenu: (state, action: PayloadAction<menu>) => {
      state.menus = state.menus.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
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

export const { setMenu, addMenu, removeMenu, replaceMenu } = menuSlice.actions;

export default menuSlice.reducer;
