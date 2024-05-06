import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { tableId } = req.query;
  const isValid = tableId;
  if (!isValid) return res.status(400).send("Bad Request");
  if (method === "GET") {
    const table = await prisma.table.findFirst({
      where: { id: Number(tableId) },
    });

    const location = await prisma.location.findFirst({
      where: { id: table?.locationId },
    });
    const company = await prisma.company.findFirst({
      where: { id: location?.companyId },
    });
    let menuCategories = await prisma.menuCategory.findMany({
      where: { companyId: company?.id, isArchive: false },
    });

    const menuCategoryIds = menuCategories.map((item) => item.id);
    const disableLocationMenuCategories = (
      await prisma.disableLocationMenuCategory.findMany({
        where: {
          MenuCategoryId: { in: menuCategoryIds },
          locationId: location?.id,
        },
      })
    ).map((item) => item.MenuCategoryId);

    menuCategories = menuCategories.filter(
      (item) => !disableLocationMenuCategories.includes(item.id)
    );
    const menuMenuCategories = await prisma.menuMenuCategory.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    });
    const menuIds = menuMenuCategories.map((item) => item.menuId);
    const disableLocationMenus = (
      await prisma.disableLocationMenu.findMany({
        where: { MenuId: { in: menuIds }, locationId: location?.id },
      })
    ).map((item) => item.MenuId);
    const menus = (
      await prisma.menu.findMany({
        where: { id: { in: menuIds }, isArchive: false },
      })
    ).filter((item) => !disableLocationMenus.includes(item.id));
    const menuAddonCategories = await prisma.menuAddonCategory.findMany({
      where: { menuId: { in: menuIds } },
    });
    const addonCategoryIds = menuAddonCategories.map(
      (item) => item.AddonCategoryId
    );
    const addonCategories = await prisma.addonCategory.findMany({
      where: { id: { in: addonCategoryIds }, isArchive: false },
    });
    const addons = await prisma.addon.findMany({
      where: { AddonCategoryId: { in: addonCategoryIds }, isArchived: false },
    });
    const orders = await prisma.order.findMany({
      where: { tableId: Number(tableId) },
    });

    return res.status(200).json({
      company,
      locations: [location],
      menuCategories,
      menus,
      menuMenuCategories,
      menuAddonCategories,
      addonCategories,
      addons,
      tables: [table],
      disableLocationMenuCategories: [],
      disableLocationMenus: [],
      orders,
    });
  }

  return res.status(200).send("from order app");
}
