import { CompanySlice } from "@/type/company";
import { Company } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CompanySlice = {
  company: null,
  isLoading: false,
  onError: null,
};

export const companySlice = createSlice({
  name: "Company",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompanies } = companySlice.actions;
export default companySlice.reducer;
