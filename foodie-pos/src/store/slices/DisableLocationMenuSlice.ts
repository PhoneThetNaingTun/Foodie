import { disableLocationMenuSlice } from "@/type/disableLocationMenu";
import { DisableLocationMenu } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: disableLocationMenuSlice = {
  disableLocationMenus: [],
  isLoading: false,
  error: null,
};

const DisableLocationMenuSlice = createSlice({
  name: "disableLocationMenu",
  initialState,
  reducers: {
    setDisableLocationMenu: (
      state,
      action: PayloadAction<DisableLocationMenu[]>
    ) => {
      state.disableLocationMenus = action.payload;
    },
  },
});

export const { setDisableLocationMenu } = DisableLocationMenuSlice.actions;
export default DisableLocationMenuSlice.reducer;
