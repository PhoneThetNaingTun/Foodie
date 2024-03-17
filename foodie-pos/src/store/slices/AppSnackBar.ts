import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SnackBarType = "error" | "success";

interface appSnackBarSlice {
  open: boolean;
  type: SnackBarType;
  message: string;
}

const initialState: appSnackBarSlice = {
  open: false,
  type: "success",
  message: "",
};

export const AppSnackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    openSnackBar: (
      state,
      action: PayloadAction<{ type: SnackBarType; message: string }>
    ) => {
      const { type, message } = action.payload;
      state.open = true;
      state.type = type;
      state.message = message;
    },
    closeSnackBar: (state) => {
      state.open = false;
      state.type = "success";
      state.message = "";
    },
  },
});
export const { openSnackBar, closeSnackBar } = AppSnackBarSlice.actions;
export default AppSnackBarSlice.reducer;
