import { qrImageUpload } from "@/utils/assetUpload";
import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
  } else if (method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId !== undefined;
    if (!isValid) return res.status(400).send("Bad Request");
    let newTable = await prisma.table.create({
      data: { name, locationId, assetUrl: "" },
    });
    const assetUrl = await qrImageUpload(newTable.id);
    newTable = await prisma.table.update({
      data: { assetUrl },
      where: { id: newTable.id },
    });
    return res.status(200).json({ newTable });
  } else if (method === "PUT") {
    const { id, name } = req.body;
    const exist = await prisma.table.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request");
    const updatedTable = await prisma.table.update({
      data: { name },
      where: { id },
    });
    return res.status(200).json({ updatedTable });
  } else if (method === "DELETE") {
  }
  return res.status(405).send("Invalid Method");
}
