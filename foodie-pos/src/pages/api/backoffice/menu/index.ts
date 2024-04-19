import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
  } else if (method === "POST") {
    const { name, price, menuCategoryId, assetUrl } = req.body;
    const isValid = name && price !== undefined && menuCategoryId.length > 0;
    if (!isValid) return res.status(400).send("Bad Request");
    const menu = await prisma.menu.create({ data: { name, price, assetUrl } });
    const menuCategoryMenuId = await prisma.$transaction(
      menuCategoryId.map((item: number) =>
        prisma.menuMenuCategory.create({
          data: { menuId: menu.id, menuCategoryId: item },
        })
      )
    );
    return res.status(200).json({ menu, menuCategoryMenuId });
  } else if (method === "PUT") {
    const { id, name, price, menuCategoryIds, locationId, isAvailable } =
      req.body;
    const exist = await prisma.menu.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request");
    const updatedMenu = await prisma.menu.update({
      data: { name, price },
      where: { id },
    });

    if (locationId && isAvailable !== undefined) {
      if (isAvailable === false) {
        await prisma.disableLocationMenu.create({
          data: { locationId, MenuId: id },
        });
      } else {
        const item = await prisma.disableLocationMenu.findFirst({
          where: { locationId, MenuId: id },
        });
        item &&
          (await prisma.disableLocationMenu.delete({ where: { id: item.id } }));
      }
    }
    if (menuCategoryIds) {
      const menuMenuCategory = await prisma.menuMenuCategory.findMany({
        where: { menuId: id },
      });
      //remove
      const toRemove = menuMenuCategory.filter(
        (item) => !menuCategoryIds.includes(item.menuCategoryId)
      );
      if (toRemove.length) {
        await prisma.menuMenuCategory.deleteMany({
          where: { id: { in: toRemove.map((item) => item.id) } },
        });
      }
      const toAdd = menuCategoryIds.filter(
        (menucategoryId: number) =>
          !menuMenuCategory.find(
            (item) => item.menuCategoryId === menucategoryId
          )
      );
      if (toAdd.length) {
        await prisma.$transaction(
          toAdd.map((itemId: number) =>
            prisma.menuMenuCategory.create({
              data: { menuId: id, menuCategoryId: itemId },
            })
          )
        );
      }
    }
    const menuMenuCategories = await prisma.menuMenuCategory.findMany({
      where: { menuId: id },
    });
    const disableLocationMenus = await prisma.disableLocationMenu.findMany({
      where: { locationId },
    });

    return res
      .status(200)
      .json({ menuMenuCategories, updatedMenu, disableLocationMenus });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const exist = await prisma.menu.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request");
    await prisma.menu.update({ data: { isArchive: true }, where: { id } });
    return res.status(200).send("OK");
  }
  return res.status(405).send("Invalid Method");
}
