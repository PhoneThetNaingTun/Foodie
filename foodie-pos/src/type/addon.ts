import { Addon } from "@prisma/client";
import { BaseOptions } from "./user";

export interface addonSlice {
  addons: Addon[];
  isLoading: boolean;
  error: Error | null;
}

export interface NewAddonPayload extends BaseOptions {
  name: string;
  price: Number;
  AddonCategoryId?: number;
}

export interface UpdateAddonPayload extends Addon, BaseOptions {}
