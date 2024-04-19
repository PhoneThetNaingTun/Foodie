import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
  } else if (method === "POST") {
    const { name, isAvailable, companyId } = req.body;
    const isValid = name && companyId && isAvailable !== undefined;
    if (!isValid) res.status(404).send("Bad Request");
    const menuCategory = await prisma.menuCategory.create({
      data: { name, isAvailable, companyId },
    });
    return res.status(200).json({ menuCategory });
  } else if (method === "PUT") {
    const { id, isAvailable, locationId, ...payload } = req.body;
    const exist = await prisma.menuCategory.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request");
    const updatedMenuCategory = await prisma.menuCategory.update({
      data: payload,
      where: { id },
    });
    if (locationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disableLocationMenuCategory.create({
          data: { MenuCategoryId: id, locationId },
        });
      } else {
        const item = await prisma.disableLocationMenuCategory.findFirst({
          where: { MenuCategoryId: id, locationId },
        });
        item &&
          (await prisma.disableLocationMenuCategory.delete({
            where: { id: item.id },
          }));
      }
    }

    const disabledLocationMenuCategories =
      await prisma.disableLocationMenuCategory.findMany();
    return res
      .status(200)
      .json({ updatedMenuCategory, disabledLocationMenuCategories });
  } else if (method === "DELETE") {
    const menucategoryId = Number(req.query.id);
    const findMenuCategory = await prisma.menuCategory.findFirst({
      where: { id: menucategoryId },
    });
    if (!findMenuCategory) return res.status(400).send("Bad Request");
    await prisma.menuCategory.update({
      data: { isArchive: true },
      where: { id: menucategoryId },
    });
    return res.status(200).send("Ok");
  }
  return res.status(405).send("Invalid Method");
}
