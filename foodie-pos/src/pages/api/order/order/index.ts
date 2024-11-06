import { cartItem } from "@/type/cart";
import { getCartTotalPrice } from "@/utils/general";
import { prisma } from "@/utils/prisma";
import { ORDERSTATUS } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const isValid = req.query.orderSeq;
    if (!isValid) return res.status(400).send("Bad request");
    const orderSeq = String(req.query.orderSeq);
    const exist = await prisma.order.findMany({ where: { orderSeq } });
    if (!exist) return res.status(400).send("Bad request");
    return res.status(200).json({ orders: exist });
  } else if (method === "POST") {
    const { tableId, cartItems } = req.body;
    const isValid = tableId && cartItems.length;
    if (!isValid) return res.status(400).send("Bad Request");
    const order = await prisma.order.findFirst({
      where: {
        tableId,
        status: { in: [ORDERSTATUS.PENDING, ORDERSTATUS.COOKING] },
      },
    });
    const orderSeq = order ? order.orderSeq : nanoid();
    const totalPrice = order
      ? order.totalPrice + getCartTotalPrice(cartItems)
      : getCartTotalPrice(cartItems);
    for (const item of cartItems) {
      const cartItem = item as cartItem;
      const hasAddon = cartItem.addon.length > 0;
      if (hasAddon) {
        for (const addon of cartItem.addon) {
          await prisma.order.create({
            data: {
              menuId: cartItem.menu.id,
              addonId: addon.id,
              itemId: cartItem.id,
              quantity: cartItem.quantity,
              orderSeq,
              status: ORDERSTATUS.PENDING,
              totalPrice,
              tableId,
            },
          });
        }
      } else {
        await prisma.order.create({
          data: {
            menuId: cartItem.menu.id,
            itemId: cartItem.id,
            quantity: cartItem.quantity,
            orderSeq,
            status: ORDERSTATUS.PENDING,
            totalPrice,
            tableId,
          },
        });
      }
    }
    await prisma.order.updateMany({
      data: { totalPrice },
      where: { orderSeq },
    });
    const orders = await prisma.order.findMany({ where: { orderSeq } });
    return res.status(200).json({ orders });
  } else if (method === "PUT") {
  } else {
    return res.status(405).send("method not allow");
  }
}
