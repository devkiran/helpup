import { Collection } from "@prisma/client";

import prisma from "@lib/prisma";

export const createCollection = async (
  data: Pick<Collection, "title" | "slug" | "description" | "workspaceId">
): Promise<Collection> => {
  const { title, slug, description, workspaceId } = data;

  return await prisma.collection.create({
    data: { title, slug, description, workspaceId },
  });
};

export const getCollection = async (
  where:
    | { workspaceId: string; slug: string }
    | { workspaceId: string; id: string }
): Promise<Collection | null> => {
  return await prisma.collection.findFirst({
    where,
  });
};
