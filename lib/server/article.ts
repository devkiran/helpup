import prisma from "@lib/prisma";
import { Article } from "@prisma/client";

export const getArticle = async (
  where:
    | { workspaceId: string; slug: string }
    | { workspaceId: string; id: string }
): Promise<Article | null> => {
  return await prisma.article.findFirst({
    where,
  });
};
