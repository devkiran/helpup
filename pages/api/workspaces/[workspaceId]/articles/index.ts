import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@lib/prisma";
import { slugify } from "@lib/slugify";
import { getArticle } from "@lib/server/article";

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
  const { workspaceId } = req.query as {
    workspaceId: string;
  };

  const articles = await prisma.article.findMany({
    where: {
      workspaceId,
    },
    include: {
      collection: true,
    },
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });

  res.status(200).json({ data: articles });
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceId } = req.query as {
    workspaceId: string;
  };

  const { title, contentText, contentHtml, collectionId } = req.body as {
    title: string;
    contentText: string;
    contentHtml: string;
    collectionId: string;
  };

  const slug = slugify(title);

  if (await getArticle({ workspaceId, slug })) {
    return res.status(409).json({
      error: { message: `Article with title ${title} already exists` },
    });
  }

  const article = await prisma.article.create({
    data: {
      title,
      slug,
      contentText,
      contentHtml,
      workspaceId,
      collectionId,
    },
  });

  return res.status(201).json({ data: article });
};
