import { config } from "@/config";
import { NewTablePayload, UpdatedTablePayload, tableSlice } from "@/type/table";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: tableSlice = {
  tables: [],
  isLoading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "tableSlice/createTable",
  async (payload: NewTablePayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/table`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newTable } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(addTable(newTable));
  }
);

export const updateTable = createAsyncThunk(
  "tableSlice/updateTable",
  async (payload: UpdatedTablePayload, thunkApi) => {
    const { onSuccess } = payload;
    const response = await fetch(`${config.backOfficeApi}/table`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedTable } = dataFromServer;
    onSuccess && onSuccess();
    thunkApi.dispatch(replaceTable(updatedTable));
  }
);

const TableSlice = createSlice({
  name: "tableSlice",
  initialState,
  reducers: {
    setTables: (state, action: PayloadAction<Table[]>) => {
      state.tables = action.payload;
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables = [...state.tables, action.payload];
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.tables = state.tables.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setTables, addTable, replaceTable } = TableSlice.actions;
export default TableSlice.reducer;
