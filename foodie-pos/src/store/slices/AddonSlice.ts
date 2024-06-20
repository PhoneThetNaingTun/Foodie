import { config } from "@/config";
import backOffice from "@/pages/backoffice";
import {
  DeleteAddonPayload,
  NewAddonPayload,
  UpdateAddonPayload,
  addonSlice,
} from "@/type/addon";
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
export const updateAddon = createAsyncThunk(
  "addonSlice/updateAddon",
  async (payload: UpdateAddonPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/addon`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedAddon } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceAddon(updatedAddon));
  }
);

export const deleteAddon = createAsyncThunk(
  "addonSlice/deleteAddon",
  async (payload: DeleteAddonPayload, thunkApi) => {
    const { onSuccess, id } = payload;
    await fetch(`${config.backOfficeApi}/addon?id=${id}`, { method: "DELETE" });
    onSuccess && onSuccess();
    thunkApi.dispatch(removeAddon(id));
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
    removeAddon: (state, action: PayloadAction<Number>) => {
      state.addons = state.addons.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    replaceAddon: (state, action: PayloadAction<UpdateAddonPayload>) => {
      state.addons = state.addons.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setAddons, addAddon, removeAddon, replaceAddon } =
  AddonSlice.actions;
export default AddonSlice.reducer;
