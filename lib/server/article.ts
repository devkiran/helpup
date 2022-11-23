import { Article, Prisma } from "@prisma/client";

import prisma from "@lib/prisma";

export const createArticle = async (
  data: Omit<Article, "id" | "createdAt" | "updatedAt">
): Promise<Article> => {
  const { title, slug, contentHtml, contentText, workspaceId, collectionId } =
    data;

  return await prisma.article.create({
    data: { title, slug, contentHtml, contentText, workspaceId, collectionId },
  });
};

export const updateArticle = async (
  id: string,
  data: Omit<Article, "id" | "createdAt" | "updatedAt" | "workspaceId">
): Promise<Article> => {
  const { title, slug, contentHtml, contentText, collectionId } = data;

  return await prisma.article.update({
    where: {
      id,
    },
    data: { title, slug, contentHtml, contentText, collectionId },
  });
};

export const getArticle = async (
  where:
    | { workspaceId: string; slug: string }
    | { workspaceId: string; id: string }
): Promise<Article | null> => {
  return await prisma.article.findFirst({
    where,
  });
};

// export const getAllArticles = async (
//   where:
//     | {
//         collectionId: string;
//       }
//     | {
//         workspaceId: string;
//       }
// ): Promise<Article[] | null> => {
//   return await prisma.article.findMany({
//     where,
//   });
// };
