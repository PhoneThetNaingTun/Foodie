import { BaseOptions } from "./user";

export interface NewMenuCategoryPayload extends BaseOptions {
  name: string;
  isAvailable: boolean;
  companyId?: number;
}

export interface UpdatedMenuCategoryPayload extends BaseOptions {
  id: number;
  name?: string;
  isAvailable?: boolean;
  locationId?: number;
}
export interface DeleteMenuCategoryPayload extends BaseOptions {
  id: Number;
}
