import { Table } from "@prisma/client";
import { BaseOptions } from "./user";

export interface tableSlice {
  tables: Table[];
  isLoading: boolean;
  error: Error | null;
}
export interface NewTablePayload extends BaseOptions {
  name: string;
  locationId?: number;
}
