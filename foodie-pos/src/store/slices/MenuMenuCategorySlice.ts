import { menuMenuCategory } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MenuMenuCategorySlice {
  menuMenuCategories: menuMenuCategory[];
  isLoading: boolean;
  onError: Error | null;
}

const initialState: MenuMenuCategorySlice = {
  menuMenuCategories: [],
  isLoading: false,
  onError: null,
};

const MenuMenuCategorySlice = createSlice({
  name: "menuMenuCategory",
  initialState,
  reducers: {
    setMenuMenuCategory: (state, action: PayloadAction<menuMenuCategory[]>) => {
      state.menuMenuCategories = action.payload;
    },
  },
});

export const { setMenuMenuCategory } = MenuMenuCategorySlice.actions;
export default MenuMenuCategorySlice.reducer;
