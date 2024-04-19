import { DisableLocationMenu } from "@prisma/client";

export interface disableLocationMenuSlice {
  disableLocationMenus: DisableLocationMenu[];
  isLoading: boolean;
  error: Error | null;
}
