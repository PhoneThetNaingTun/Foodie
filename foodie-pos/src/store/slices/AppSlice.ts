import { config } from "@/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setMenuCategories } from "./menuCategorySlice";
import { setCompanies } from "./CompanySlice";
import { setMenuMenuCategory } from "./MenuMenuCategorySlice";
import { setLocation } from "./locationSlice";
import { appSlice, updateImagePayload } from "@/type/app";
import { Location } from "@prisma/client";
import { setDisabledLocationMenuCategory } from "./DisableLocationMenuCategorySlice";
import { setDisableLocationMenu } from "./DisableLocationMenuSlice";
import { setMenuAddonCategories } from "./MenuAddonCategorySlice";
import { setAddonCategories } from "./AddonCategorySlice";
import { setAddons } from "./AddonSlice";
import { setTables } from "./TableSlice";

const initialState: appSlice = {
  init: false,
  selectedLocation: null,
  isLoading: false,
  Error: null,
};

export const uploadAsset = createAsyncThunk(
  "app/uploadAsset",
  async (payload: updateImagePayload, thunkApi) => {
    const { file, onSuccess } = payload;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${config.backOfficeApi}/asset`, {
      method: "POST",
      body: formData,
    });
    const dataFromServer = await response.json();
    const { assetUrl } = dataFromServer;
    onSuccess && onSuccess(assetUrl);
  }
);

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (_, thunkApi) => {
    thunkApi.dispatch(setIsLoading(true));
    const response = await fetch(`${config.backOfficeApi}/app`);
    const dataFromServer = await response.json();
    const {
      company,
      locations,
      tables,
      menus,
      menuCategories,
      menuMenuCategories,
      disableLocationMenuCategories,
      addonCategories,
      disableLocationMenus,
      menuAddonCategories,

      addons,
    } = dataFromServer;
    thunkApi.dispatch(setMenu(menus));
    thunkApi.dispatch(setCompanies(company));
    thunkApi.dispatch(setLocation(locations));
    thunkApi.dispatch(setMenuCategories(menuCategories));
    thunkApi.dispatch(setMenuMenuCategory(menuMenuCategories));
    thunkApi.dispatch(setMenuAddonCategories(menuAddonCategories));
    thunkApi.dispatch(setAddonCategories(addonCategories));
    thunkApi.dispatch(
      setDisabledLocationMenuCategory(disableLocationMenuCategories)
    );
    thunkApi.dispatch(setDisableLocationMenu(disableLocationMenus));
    thunkApi.dispatch(setAddons(addons));
    thunkApi.dispatch(setTables(tables));
    const selectedLocationId = localStorage.getItem("selectedLocationId");
    if (selectedLocationId) {
      const selectedLocation = locations.find(
        (item: any) => item.id === selectedLocationId
      ) as Location;
      thunkApi.dispatch(setSelectedLocation(selectedLocation));
    } else thunkApi.dispatch(setSelectedLocation(locations[0]));

    thunkApi.dispatch(setInit(true));
    thunkApi.dispatch(setIsLoading(false));
  }
);

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const { setInit, setIsLoading, setSelectedLocation } = AppSlice.actions;
export default AppSlice.reducer;
