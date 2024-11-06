import { Addon, ORDERSTATUS, Order, Table, menu } from "@prisma/client";
import { cartItem } from "./cart";
import { BaseOptions } from "./user";

export interface orderSlice {
  item: Order[];
  isLoading: boolean;
  err: Error | null;
}

export interface createOrderOptions extends BaseOptions {
  tableId: Number;
  cartItems: cartItem[];
}
export interface UpdateOrderOptions extends BaseOptions {
  itemId: string;
  status: ORDERSTATUS;
}

export interface RefreshOrderOptions extends BaseOptions {
  orderSeq: string;
}
export interface OrderAddon {
  addonCategoryId: number;
  addons: Addon[];
}

export interface OrderItem {
  itemId: string;
  status: ORDERSTATUS;
  orderAddons: OrderAddon[];
  menu: menu;
  table: Table;
}
