import prisma from "@lib/prisma";
import { Article } from "@prisma/client";

export const createArticle = async (
  data: Omit<Article, "id" | "createdAt" | "updatedAt">
): Promise<Article> => {
  const { title, slug, contentHtml, contentText, workspaceId, collectionId } =
    data;

  return await prisma.article.create({
    data: { title, slug, contentHtml, contentText, workspaceId, collectionId },
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

// Search articles by search term
export const searchArticles = async (workspaceId: string, q: string) => {
  return await prisma.article.aggregateRaw({
    pipeline: [
      {
        $search: {
          index: "searchArticles",
          compound: {
            should: [
              {
                text: {
                  query: q,
                  path: {
                    wildcard: "*",
                  },
                },
              },
            ],
            minimumShouldMatch: 1,
          },
        },
      },
      {
        $project: {
          title: 1,
          contentText: 1,
          updatedAt: 1,
          slug: 1,
        },
      },
    ],
  });
};

// Autocomplete articles by search term
export const autocompleteArticles = async (q: string) => {
  return await prisma.article.aggregateRaw({
    pipeline: [
      {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: q,
            path: "contentText",
            tokenOrder: "sequential",
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          title: 1,
          slug: 1,
        },
      },
    ],
  });
};
