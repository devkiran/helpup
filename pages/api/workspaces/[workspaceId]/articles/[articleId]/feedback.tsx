import type { NextApiRequest, NextApiResponse } from "next";

import { getArticle } from "@lib/server/article";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "PUT":
      return handlePUT(req, res);
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceId, articleId } = req.query as {
    workspaceId: string;
    articleId: string;
  };

  const { value } = req.body as {
    value: string;
  };

  const article = await getArticle({ workspaceId, id: articleId });

  if (!article) {
    return res.status(404).json({ error: { message: "Article not found" } });
  }

  const data =
    value === "positive"
      ? { helpfulCount: article.helpfulCount + 1 }
      : { notHelpfulCount: article.notHelpfulCount + 1 };

  try {
    await prisma.article.update({
      where: { id: articleId },
      data,
    });

    return res.status(200).json({ data: { status: true } });
  } catch (error: any) {
    return res.status(500).json({ error: { message: error.message } });
  }
};
