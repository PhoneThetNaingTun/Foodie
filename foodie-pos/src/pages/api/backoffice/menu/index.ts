import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
  } else if (method === "POST") {
    const { name, price, menuCategoryId } = req.body;
    const isValid = name && price !== undefined && menuCategoryId.length > 0;
    if (!isValid) return res.status(404).send("Bad Request");
    const menu = await prisma.menu.create({ data: { name, price } });
    const menuCategoryMenuId = await prisma.$transaction(
      menuCategoryId.map((item: number) =>
        prisma.menuMenuCategory.create({
          data: { menuId: menu.id, menuCategoryId: item },
        })
      )
    );
    return res.status(200).json({ menu, menuCategoryMenuId });
  } else if (method === "PUT") {
  } else if (method === "DELETE") {
  }
  return res.status(405).send("Invalid Method");
}
