import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
  } else if (method === "POST") {
    const { name, price, AddonCategoryId } = req.body;
    const isValid = name && price !== undefined;
    if (!isValid) return res.status(400).send("Bad request");
    const newAddon = await prisma.addon.create({
      data: { name, price, AddonCategoryId },
    });
    return res.status(200).json({ newAddon });
  } else if (method === "PUT") {
    const { id, ...payload } = req.body;
    const isExist = await prisma.addon.findFirst({ where: { id } });
    if (!isExist) return res.status(400).send("Bad Request");
    const updatedAddon = await prisma.addon.update({
      data: payload,
      where: { id },
    });
    return res.status(200).json({ updatedAddon });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isExist = await prisma.addon.findFirst({ where: { id } });
    if (!isExist) return res.status(400).send("Bad Request");
    await prisma.addon.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("OK");
  }
  return res.status(405).send("Invalid Method");
}
