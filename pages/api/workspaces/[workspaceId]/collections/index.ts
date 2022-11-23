import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";
import { slugify } from "@lib/slugify";
import { createCollection, getCollection } from "@lib/server/collection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGET(req, res);
    case "POST":
      return handlePOST(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceId } = req.query as { workspaceId: string };

  const collections = await prisma.collection.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json({ data: collections });
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description } = req.body as {
    title: string;
    description: string;
  };

  const { workspaceId } = req.query as { workspaceId: string };

  const slug = slugify(title);

  if (await getCollection({ workspaceId, slug })) {
    return res.status(409).json({
      error: { message: `Collection with title ${title} already exists` },
    });
  }

  const collection = await createCollection({
    title,
    slug,
    description,
    workspaceId,
  });

  res.status(201).json({ data: collection });
};
