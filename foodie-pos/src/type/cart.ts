import { Addon, menu } from "@prisma/client";

export interface cartItem {
  id: string;
  menu: menu;
  addon: Addon[];
  quantity: number;
}

export interface cartSlice {
  isLoading: boolean;
  items: cartItem[];
  err: Error | null;
}
