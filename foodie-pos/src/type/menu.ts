import { BaseOptions } from "./user";

export interface BaseMenu {
  name: string;
  price: number;
}

export interface Menu extends BaseMenu {
  id: number;
}

export interface NewMenuPayload extends BaseOptions, BaseMenu {}
