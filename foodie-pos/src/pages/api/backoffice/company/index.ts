import { prisma } from "@/utils/prisma";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const method = req.method;
  if (method === "POST") {
    const { id, name, street, townShip, city } = req.body;
    const isExist = await prisma.company.findFirst({ where: { id } });
    if (!isExist) return res.status(400).send("Bad Request");
    const company = await prisma.company.update({
      data: { name, street, townShip, city },
      where: { id },
    });
    return res.status(200).json({ company });
  } else {
    return res.status(405).send("Method Not Allow");
  }
}
