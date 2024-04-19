import { menu } from "@prisma/client";
import { BaseOptions } from "./user";

export interface BaseMenu {
  name: string;
  price: number;
}

export interface NewMenuPayload extends BaseOptions, BaseMenu {
  menuCategoryId: number[];
  assetUrl?: string;
}
export interface UpdateMenuPayload extends menu, BaseMenu, BaseOptions {
  isAvailable?: boolean;
  locationId?: number;
  menuCategoryIds?: number[];
}
export interface DeleteMenuPayload extends BaseOptions {
  id: Number;
}
