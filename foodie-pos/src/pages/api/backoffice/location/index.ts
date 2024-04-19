import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
  } else if (method === "POST") {
    const { name, street, township, city, companyId } = req.body;
    const isValid =
      name && street && township && city && companyId !== undefined;
    if (!isValid) return res.status(400).send("Bad Request");
    const newLocation = await prisma.location.create({
      data: { name, street, township, city, companyId },
    });
    return res.status(200).json({ newLocation });
  } else if (method === "PUT") {
    const { id, ...payload } = req.body;
    const exist = await prisma.location.findFirst({ where: { id } });
    if (!exist) return res.status(400).send("Bad Request");
    const updatedLocation = await prisma.location.update({
      where: { id },
      data: payload,
    });
    return res.status(200).json({ updatedLocation });
  } else if (method === "DELETE") {
  }
  return res.status(405).send("Invalid Method");
}
