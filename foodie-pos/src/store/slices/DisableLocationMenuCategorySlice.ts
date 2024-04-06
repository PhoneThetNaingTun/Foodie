import { disableLocationMenucategorySlice } from "@/type/disableLocationMenucategory";
import { DisableLocationMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: disableLocationMenucategorySlice = {
  disableLocationMenucategories: [],
  isLoading: false,
  error: null,
};

const DisableLocationMenuCategorySlice = createSlice({
  name: "DisableLocationMenuCategory",
  initialState,
  reducers: {
    setDisabledLocationMenuCategory: (
      state,
      action: PayloadAction<DisableLocationMenuCategory[]>
    ) => {
      state.disableLocationMenucategories = action.payload;
    },
  },
});

export const { setDisabledLocationMenuCategory } =
  DisableLocationMenuCategorySlice.actions;
export default DisableLocationMenuCategorySlice.reducer;
