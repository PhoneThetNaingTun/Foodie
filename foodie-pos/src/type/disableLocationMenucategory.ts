import { DisableLocationMenuCategory } from "@prisma/client";

export interface disableLocationMenucategorySlice {
  disableLocationMenucategories: DisableLocationMenuCategory[];
  isLoading: boolean;
  error: Error | null;
}
