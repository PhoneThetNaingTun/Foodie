import { config } from "@/config";
import {
  DeleteLocaionPayload,
  LocationSlice,
  NewLocationPayload,
  UpdatedLocationPayload,
} from "@/type/location";
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
export const updateLocation = createAsyncThunk(
  "locationSlice/updateLocation",
  async (payload: UpdatedLocationPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/location`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedLocation } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceLocation(updatedLocation));
  }
);

export const deleteLocation = createAsyncThunk(
  "locationSlice/deleteLocation",
  async (payload: DeleteLocaionPayload, thunkApi) => {
    const { id, onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/location?id=${id}`, {
      method: "DELETE",
    });
    onSuccess && onSuccess();
    thunkApi.dispatch(removeLocation(id));
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
    replaceLocation: (state, action: PayloadAction<Location>) => {
      state.locations = state.locations.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeLocation: (state, action: PayloadAction<Number>) => {
      state.locations = state.locations.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
  },
});

export const { setLocation, addLocation, replaceLocation, removeLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
