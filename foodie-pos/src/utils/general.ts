import { Addon, Order, Table, menu } from "@prisma/client";
import { cartItem } from "../type/cart";
import { OrderAddon, OrderItem } from "@/type/order";

export const getCartTotalPrice = (cartItems: cartItem[]) => {
  const totalPrice = cartItems.reduce((accu, curr) => {
    const menuPrice = curr.menu.price;
    const totalAddonPrice = curr.addon.reduce(
      (addonPrice, addon) => (addonPrice += addon.price),
      0
    );
    accu += (menuPrice + totalAddonPrice) * Number(curr.quantity);
    return accu;
  }, 0);
  return totalPrice;
};
export const formatOrders = (
  orders: Order[],
  addons: Addon[],
  menus: menu[],
  tables: Table[]
): OrderItem[] => {
  const orderItemIds: string[] = [];
  orders.forEach((order) => {
    const itemId = order.itemId;
    const exist = orderItemIds.find((orderItemId) => orderItemId === itemId);
    if (!exist) orderItemIds.push(itemId);
  });
  const orderItems: OrderItem[] = orderItemIds.map((orderItemId) => {
    const currentOrders = orders.filter(
      (order) => order.itemId === orderItemId
    );
    const addonIds = currentOrders.map((item) => item.addonId);
    let orderAddons: OrderAddon[] = [];
    if (addonIds.length) {
      addonIds.forEach((addonId) => {
        const addon = addons.find((item) => item.id === addonId) as Addon;
        if (!addon) return;
        const exist = orderAddons.find(
          (item) => item.addonCategoryId === addon.AddonCategoryId
        );
        if (exist) {
          orderAddons = orderAddons.map((item) => {
            const isSameParent = item.addonCategoryId === addon.AddonCategoryId;
            if (isSameParent) {
              return {
                addonCategoryId: addon.AddonCategoryId,
                addons: [...item.addons, addon].sort((a, b) =>
                  a.name.localeCompare(b.name)
                ),
              };
            } else {
              return item;
            }
          });
        } else {
          orderAddons = [
            ...orderAddons,
            {
              addonCategoryId: addon.AddonCategoryId,
              addons: [addon].sort((a, b) => a.name.localeCompare(b.name)),
            },
          ];
        }
      });
    }

    return {
      itemId: orderItemId,
      status: currentOrders[0].status,
      orderAddons: addonIds.length
        ? orderAddons.sort((a, b) => a.addonCategoryId - b.addonCategoryId)
        : [],
      menu: menus.find((item) => item.id === currentOrders[0].menuId) as menu,
      table: tables.find(
        (item) => item.id === currentOrders[0].tableId
      ) as Table,
    };
  });
  return orderItems.sort((a, b) => a.itemId.localeCompare(b.itemId));
};
