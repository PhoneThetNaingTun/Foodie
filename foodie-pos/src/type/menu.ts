import { menu } from "@prisma/client";
import { BaseOptions } from "./user";

export interface BaseMenu {
  name: string;
  price: number;
}

export interface NewMenuPayload extends BaseOptions, BaseMenu {
  menuCategoryId: number[];
}
export interface UpdateMenuPayload extends menu, BaseMenu {}
