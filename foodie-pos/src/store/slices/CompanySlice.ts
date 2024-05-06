import { config } from "@/config";
import { CompanySlice, updateCompanyPayload } from "@/type/company";
import { Company } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CompanySlice = {
  company: null,
  isLoading: false,
  onError: null,
};

export const UpdateCompany = createAsyncThunk(
  "companySlice/updateCompany",
  async (payload: updateCompanyPayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/company`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { company } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(setCompanies(company));
  }
);

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
