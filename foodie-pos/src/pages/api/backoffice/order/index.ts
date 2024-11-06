import { prisma } from "@/utils/prisma";
import { ORDERSTATUS } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    return res.status(200).send("OK GET order");
  } else if (method === "POST") {
    return res.status(200).send("OK POST order");
  } else if (method === "PUT") {
    const itemId = String(req.query.itemId);
    const isValid = itemId && req.body.status;
    if (!isValid) return res.status(400).send("Bad request");
    const exist = await prisma.order.findFirst({ where: { itemId } });
    if (!exist) return res.status(400).send("Bad request");
    await prisma.order.updateMany({
      data: { status: req.body.status as ORDERSTATUS },
      where: { itemId },
    });
    const table = await prisma.table.findFirst({
      where: { id: exist.tableId },
    });
    const tableIds = (
      await prisma.table.findMany({ where: { locationId: table?.locationId } })
    ).map((item) => item.id);
    const orders = await prisma.order.findMany({
      where: { tableId: { in: tableIds }, isArchived: false },
      orderBy: { id: "asc" },
    });
    return res.status(200).json({ orders });
  } else if (method === "DELETE") {
    return res.status(200).send("OK DELETE order");
  }
  return res.status(405).send("Invalid method");
}
