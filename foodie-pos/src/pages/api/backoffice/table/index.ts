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
    const newTable = await prisma.table.create({
      data: { name, locationId, assetUrl: "" },
    });
    return res.status(200).json({ newTable });
  } else if (method === "PUT") {
  } else if (method === "DELETE") {
  }
  return res.status(405).send("Invalid Method");
}
