import { Location } from "@prisma/client";
import { BaseOptions } from "./user";

export interface appSlice extends BaseOptions {
  init: boolean;
  selectedLocation: Location | null;
  isLoading: boolean;
  Error: Error | null;
}

export interface updateImagePayload extends BaseOptions {
  file: File;
}

export interface getAppDataOptions extends BaseOptions {
  tableId?: number;
}
