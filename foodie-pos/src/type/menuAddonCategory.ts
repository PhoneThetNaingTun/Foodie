import { MenuAddonCategory } from "@prisma/client";

export interface menuAddonCatgorySlice {
  menuAddonCategories: MenuAddonCategory[];
  isLoading: boolean;
  error: Error | null;
}
