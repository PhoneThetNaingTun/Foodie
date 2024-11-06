import { config } from "@/config";
import backOffice from "@/pages/backoffice";
import {
  DeleteAddonCategoryPayload,
  NewAddonCategoryPayload,
  UpdateAddonCategoryPayload,
  addonCategorySlice,
} from "@/type/addonCategory";
import { AddonCategory } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenuAddonCategories } from "./MenuAddonCategorySlice";

const initialState: addonCategorySlice = {
  addonCategories: [],
  isLoading: false,
  error: null,
};

export const createAddonCategory = createAsyncThunk(
  "addonCategory/createAddonCategory",
  async (payload: NewAddonCategoryPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/addon-category`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newAddonCategory, menuAddonCategories } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addAddonCategory(newAddonCategory));
    thunkApi.dispatch(setMenuAddonCategories(menuAddonCategories));
  }
);

export const deleteAddonCategory = createAsyncThunk(
  "addonCategory/deleteAddonCategory",
  async (payload: DeleteAddonCategoryPayload, thunkApi) => {
    const { onSuccess, id } = payload;
    await fetch(`${config.backOfficeApi}/addon-category?id=${id}`, {
      method: "DELETE",
    });
    onSuccess && onSuccess();
    thunkApi.dispatch(removeAddonCategory(id));
  }
);

export const updatedAddonCategory = createAsyncThunk(
  "addonCategory/updatedAddonCategory",
  async (payload: UpdateAddonCategoryPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/addon-category`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { addonCategory, menuAddonCategories } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceAddonCategory(addonCategory));
    thunkApi.dispatch(setMenuAddonCategories(menuAddonCategories));
  }
);

const AddonCategorySlice = createSlice({
  name: "addonCategory",
  initialState,
  reducers: {
    setAddonCategories: (state, action: PayloadAction<AddonCategory[]>) => {
      state.addonCategories = action.payload;
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = [...state.addonCategories, action.payload];
    },
    removeAddonCategory: (state, action: PayloadAction<Number>) => {
      state.addonCategories = state.addonCategories.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    replaceAddonCategory: (state, action: PayloadAction<AddonCategory>) => {
      state.addonCategories = state.addonCategories.map((addonCategory) =>
        addonCategory.id === action.payload.id ? action.payload : addonCategory
      );
    },
  },
});

export const {
  setAddonCategories,
  addAddonCategory,
  removeAddonCategory,
  replaceAddonCategory,
} = AddonCategorySlice.actions;
export default AddonCategorySlice.reducer;
