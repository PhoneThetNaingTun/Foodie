import { config } from "@/config";
import { LocationSlice, NewLocationPayload } from "@/type/location";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: LocationSlice = {
  locations: [],
  isLoading: false,
  onError: null,
};

export const createNewLocaion = createAsyncThunk(
  "locationSlice/createNewLocation",
  async (payload: NewLocationPayload, thuckApi) => {
    const response = await fetch(`${config.backOfficeApi}/location`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newLocation } = dataFromServer;
    thuckApi.dispatch(addLocation(newLocation));
  }
);

const locationSlice = createSlice({
  name: "Location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations = [...state.locations, action.payload];
    },
  },
});

export const { setLocation, addLocation } = locationSlice.actions;
export default locationSlice.reducer;
