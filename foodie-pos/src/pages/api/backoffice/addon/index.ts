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
  } else if (method === "DELETE") {
  }
  return res.status(405).send("Invalid Method");
}
