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
    const { name, price } = req.body;
    const isValid = name && price !== undefined;
    if (!isValid) return res.status(404).send("Bad Request");
    const menu = await prisma.menu.create({ data: { name, price } });
    return res.status(200).json({ menu });
  } else if (method === "PUT") {
  } else if (method === "DELETE") {
  }
  return res.status(405).send("Invalid Method");
}
