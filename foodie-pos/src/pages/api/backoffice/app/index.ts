import Addon from "@/pages/backoffice/addon";
import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    const { user } = session;
    if (user) {
      const name = user.name as string;
      const email = user.email as string;
      const userFromDb = await prisma.user.findFirst({ where: { email } });
      if (userFromDb) {
        const companyId = userFromDb.companyId;
        const company = await prisma.company.findFirst({
          where: { id: companyId },
        });
        const locations = await prisma.location.findMany({
          where: { companyId, isArchive: false },
        });
        const locationIds = locations.map((item) => item.id);
        const tables = await prisma.table.findMany({
          where: { locationId: { in: locationIds } },
        });
        const menuCategories = await prisma.menuCategory.findMany({
          orderBy: [{ isAvailable: "desc" }],
          where: { companyId, isArchive: false },
        });
        const menuCategoryId = menuCategories.map((item) => item.id);
        const disableLocationMenuCategories =
          await prisma.disableLocationMenuCategory.findMany({
            where: {
              MenuCategoryId: { in: menuCategoryId },
            },
          });
        const menuMenuCategories = await prisma.menuMenuCategory.findMany({
          where: { menuCategoryId: { in: menuCategoryId } },
        });
        const menuMenuCategoryId = menuMenuCategories.map(
          (item) => item.menuId
        );
        const menus = await prisma.menu.findMany({
          where: { id: { in: menuMenuCategoryId }, isArchive: false },
        });
        const menuId = menus.map((item) => item.id);
        const disableLocationMenus = await prisma.disableLocationMenu.findMany({
          where: { MenuId: { in: menuId } },
        });
        const menuAddonCategories = await prisma.menuAddonCategory.findMany({
          where: { menuId: { in: menuId } },
        });
        const menuAddonCategoryId = menuAddonCategories.map(
          (item) => item.AddonCategoryId
        );
        const addonCategories = await prisma.addonCategory.findMany({
          where: { id: { in: menuAddonCategoryId }, isArchive: false },
        });
        const AddonCategoryId = addonCategories.map((item) => item.id);
        const addons = await prisma.addon.findMany({
          where: {
            AddonCategoryId: { in: AddonCategoryId },
            isArchived: false,
          },
        });
        res.status(200).json({
          company,
          locations,
          tables,
          menus,
          menuCategories,
          disableLocationMenuCategories,
          disableLocationMenus,
          menuMenuCategories,
          addonCategories,
          menuAddonCategories,
          addons,
        });
      } else {
        const newCompany = await prisma.company.create({
          data: {
            name: "Default company",
            street: "Default street",
            townShip: "Default townSip",
            city: "Default City",
          },
        });
        const newUser = await prisma.user.create({
          data: { name, email, companyId: newCompany.id },
        });
        const newLocation = await prisma.location.create({
          data: {
            name: "default location",
            street: "default street",
            township: "default townShip",
            city: "default City",
            companyId: newCompany.id,
          },
        });
        const newTable = await prisma.table.create({
          data: {
            name: "default table",
            locationId: newLocation.id,
            assetUrl: "",
          },
        });
        const newMenuCategory = await prisma.menuCategory.create({
          data: { name: "default name", companyId: newCompany.id },
        });
        const newMenu = await prisma.menu.create({
          data: { name: "default menu", price: 0 },
        });
        const newMenuMenuCategoty = await prisma.menuMenuCategory.create({
          data: { menuId: newMenu.id, menuCategoryId: newMenuCategory.id },
        });
        const newAddonCategory = await prisma.addonCategory.create({
          data: { name: "default AddonCatogory" },
        });
        const newMenuAddonCategory = await prisma.menuAddonCategory.create({
          data: { menuId: newMenu.id, AddonCategoryId: newAddonCategory.id },
        });
        const newAddonsData = [
          { name: "Addon1", AddonCategoryId: newAddonCategory.id },
          { name: "Addon2", AddonCategoryId: newAddonCategory.id },
          { name: "Addon3", AddonCategoryId: newAddonCategory.id },
        ];
        const newAddon = await prisma.$transaction(
          newAddonsData.map((addon) => prisma.addon.create({ data: addon }))
        );
        res.status(200).json({
          company: newCompany,
          locations: [newLocation],
          tables: [newTable],
          menuCategories: [newMenuCategory],
          menus: [newMenu],
          menuMenuCategories: [newMenuMenuCategoty],
          addonCategories: [newAddonCategory],
          menuAddonCategories: [newMenuAddonCategory],
          addons: [newAddon],
          disableLocationMenuCategories: [],
        });
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  }
}
