import { Location } from "@prisma/client";
import { BaseOptions } from "./user";

export interface appSlice extends BaseOptions {
  init: boolean;
  selectedLocation: Location | null;
  isLoading: boolean;
  Error: Error | null;
}
