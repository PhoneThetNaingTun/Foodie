import { config } from "@/config";
import backOffice from "@/pages/backoffice";
import { NewAddonPayload, addonSlice } from "@/type/addon";
import { Addon } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: addonSlice = {
  addons: [],
  isLoading: false,
  error: null,
};

export const createAddon = createAsyncThunk(
  "addonSlice/createAddon",
  async (payload: NewAddonPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/addon`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newAddon } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addAddon(newAddon));
  }
);

const AddonSlice = createSlice({
  name: "Addon",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addon[]>) => {
      state.addons = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addon>) => {
      state.addons = [...state.addons, action.payload];
    },
  },
});

export const { setAddons, addAddon } = AddonSlice.actions;
export default AddonSlice.reducer;
