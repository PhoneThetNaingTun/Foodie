import { config } from "@/config";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMenu } from "./menuSlice";
import { setMenuCategories } from "./menuCategorySlice";
import { setCompanies } from "./CompanySlice";
import { setMenuMenuCategory } from "./MenuMenuCategory";
import { setLocation } from "./locationSlice";
import { appSlice } from "@/type/app";
import { Location } from "@prisma/client";
import { setDisabledLocationMenuCategory } from "./DisableLocationMenuCategorySlice";

const initialState: appSlice = {
  init: false,
  selectedLocation: null,
  isLoading: false,
  Error: null,
};

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
    } = dataFromServer;
    thunkApi.dispatch(setMenu(menus));
    thunkApi.dispatch(setCompanies(company));
    thunkApi.dispatch(setLocation(locations));
    thunkApi.dispatch(setMenuCategories(menuCategories));
    thunkApi.dispatch(setMenuMenuCategory(menuMenuCategories));
    thunkApi.dispatch(
      setDisabledLocationMenuCategory(disableLocationMenuCategories)
    );
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
