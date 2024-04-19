import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
  } else if (method === "POST") {
    const { name, isRequired, menuIds } = req.body;
    const isValid = name && isRequired !== undefined && menuIds.length > 0;
    if (!isValid) return res.status(400).send("Bad Request");
    const newAddonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });
    const menuAddonCategories = await prisma.$transaction(
      menuIds.map((itemId: number) =>
        prisma.menuAddonCategory.create({
          data: { menuId: itemId, AddonCategoryId: newAddonCategory.id },
        })
      )
    );
    return res.status(200).json({ newAddonCategory, menuAddonCategories });
  } else if (method === "PUT") {
    const { id, name, isRequired, menuIds, companyId } = req.body;
    const isExist = await prisma.addonCategory.findFirst({ where: { id } });
    if (!isExist) return res.status(400).send("Bad Request");
    const addonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });
    const existingAddonCategory = await prisma.menuAddonCategory.findMany({
      where: { AddonCategoryId: id },
    });
    const toRemove = existingAddonCategory.filter(
      (item) => !menuIds.includes(item.menuId)
    );
    if (toRemove.length) {
      await prisma.menuAddonCategory.deleteMany({
        where: { id: { in: toRemove.map((item) => item.id) } },
      });
    }
    const toAdd = menuIds.filter(
      (menuId: number) =>
        !existingAddonCategory.find((item) => item.menuId === menuId)
    );
    if (toAdd.length) {
      await prisma.$transaction(
        toAdd.map((menuId: number) =>
          prisma.menuAddonCategory.create({
            data: { menuId: menuId, AddonCategoryId: id },
          })
        )
      );
    }
    const menuCategories = await prisma.menuCategory.findMany({
      where: { companyId },
    });
    const menuMenuCategory = await prisma.menuMenuCategory.findMany({
      where: { menuCategoryId: { in: menuCategories.map((item) => item.id) } },
    });
    const menus = menuMenuCategory.map((item) => item.menuId);
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: menus } },
    });
    return res.status(200).json({ addonCategory, menuAddonCategories });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isExist = await prisma.addonCategory.findFirst({ where: { id } });
    if (!isExist) return res.status(400).send("Bad Request");
    await prisma.addonCategory.update({
      data: { isArchive: true },
      where: { id },
    });
    return res.status(200).send("OK");
  }
  return res.status(405).send("Invalid Method");
}
