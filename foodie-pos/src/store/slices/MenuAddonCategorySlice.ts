import { menuAddonCatgorySlice } from "@/type/menuAddonCategory";
import { MenuAddonCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: menuAddonCatgorySlice = {
  menuAddonCategories: [],
  isLoading: false,
  error: null,
};

const MenuAddonCategorySlice = createSlice({
  name: "menuAddonCategory",
  initialState,
  reducers: {
    setMenuAddonCategories: (
      state,
      action: PayloadAction<MenuAddonCategory[]>
    ) => {
      state.menuAddonCategories = action.payload;
    },
  },
});

export const { setMenuAddonCategories } = MenuAddonCategorySlice.actions;
export default MenuAddonCategorySlice.reducer;
