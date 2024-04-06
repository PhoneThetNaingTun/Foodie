import { config } from "@/config";
import {
  DeleteMenuCategoryPayload,
  NewMenuCategoryPayload,
  UpdatedMenuCategoryPayload,
} from "@/type/menuCategory";
import { menuCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDisabledLocationMenuCategory } from "./DisableLocationMenuCategorySlice";

interface MenuCategory {
  menuCategories: menuCategory[];
  isLoading: boolean;
  onError: Error | null;
}

const initialState: MenuCategory = {
  menuCategories: [],
  isLoading: false,
  onError: null,
};

export const createNewMenuCategory = createAsyncThunk(
  "menuCategory/createMenuCategory",
  async (payload: NewMenuCategoryPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/menu-category`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { menuCategory } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addMenuCategory(menuCategory));
  }
);

export const UpdateMenuCategory = createAsyncThunk(
  "menuCategory/updateMenuCategory",
  async (payload: UpdatedMenuCategoryPayload, thuckApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/menu-category`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedMenuCategory, disabledLocationMenuCategories } =
      dataFromServer;
    onSuccess && onSuccess();
    thuckApi.dispatch(replaceMenuCategory(updatedMenuCategory));
    thuckApi.dispatch(
      setDisabledLocationMenuCategory(disabledLocationMenuCategories)
    );
  }
);

export const DeleteMenuCategory = createAsyncThunk(
  "menuCategory/archivedMenuCategory",
  async (payload: DeleteMenuCategoryPayload, thunkApi) => {
    const { id, onSuccess } = payload;
    await fetch(`${config.backOfficeApi}/menu-category?id=${id}`, {
      method: "DELETE",
    });
    onSuccess && onSuccess();
    thunkApi.dispatch(removeMenuCategory(id));
  }
);

const menuCategorySlice = createSlice({
  name: "menuCategorySlice",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<menuCategory[]>) => {
      state.menuCategories = action.payload;
    },
    addMenuCategory: (state, action: PayloadAction<menuCategory>) => {
      state.menuCategories = [...state.menuCategories, action.payload];
    },
    replaceMenuCategory: (state, action: PayloadAction<menuCategory>) => {
      state.menuCategories = state.menuCategories.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenuCategory: (state, action: PayloadAction<Number>) => {
      state.menuCategories = state.menuCategories.filter((menuCategory) =>
        menuCategory.id === action.payload ? false : true
      );
    },
  },
});

export const {
  setMenuCategories,
  addMenuCategory,
  removeMenuCategory,
  replaceMenuCategory,
} = menuCategorySlice.actions;
export default menuCategorySlice.reducer;
