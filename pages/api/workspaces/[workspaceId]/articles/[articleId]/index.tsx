import type { NextApiRequest, NextApiResponse } from "next";

import { getArticle } from "@lib/server/article";
import { slugify } from "@lib/slugify";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGET(req, res);
    case "PUT":
      return handlePUT(req, res);
    case "DELETE":
      return handleDELETE(req, res);
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceId, articleId } = req.query as {
    workspaceId: string;
    articleId: string;
  };

  const { title, contentText, contentHtml, collectionId } = req.body as {
    title: string;
    contentText: string;
    contentHtml: string;
    collectionId: string;
  };

  const article = await getArticle({ workspaceId, id: articleId });

  res.status(200).json({ data: article });
};

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceId, articleId } = req.query as {
    workspaceId: string;
    articleId: string;
  };

  const { title, contentText, contentHtml, collectionId } = req.body as {
    title: string;
    contentText: string;
    contentHtml: string;
    collectionId: string;
  };

  const article = await getArticle({ workspaceId, id: articleId });

  if (!article) {
    return res.status(404).json({ error: { message: "Article not found" } });
  }

  const slug = slugify(title);

  // if (await getArticle({ workspaceId, slug })) {
  //   return res.status(409).json({
  //     error: { message: `Article with title ${title} already exists` },
  //   });
  // }

  const articleUpdated = await prisma.article.update({
    where: { id: article.id },
    data: { title, slug, contentText, contentHtml, collectionId },
  });

  res.status(200).json({ data: articleUpdated });
};

const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceId, articleId } = req.query as {
    workspaceId: string;
    articleId: string;
  };

  const article = await getArticle({ workspaceId, id: articleId });

  if (!article) {
    return res.status(404).json({ error: { message: "Article not found" } });
  }

  if (article.workspaceId !== workspaceId) {
    return res.status(403).json({ error: { message: "Forbidden" } });
  }

  await prisma.article.delete({
    where: { id: articleId },
  });

  res.status(200).json({ data: {} });
};
