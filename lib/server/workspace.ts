import prisma from "@lib/prisma";
import { Workspace } from "@prisma/client";

export const createWorkspace = async (
  data: Pick<Workspace, "name" | "slug"> & { userId: string }
): Promise<Workspace> => {
  const { name, slug, userId } = data;

  return await prisma.workspace.create({
    data: {
      name,
      slug,
      userId,
      headerColor: "rgb(37 99 235)",
      siteName: name,
      heading: `Articles and suggestions from ${name}`,
    },
  });
};

export const getWorkspace = async (slug: string): Promise<Workspace | null> => {
  return await prisma.workspace.findUnique({
    where: { slug },
  });
};

export const getAllWorkspaces = async (
  userId: string
): Promise<Workspace[] | null> => {
  return await prisma.workspace.findMany({
    where: {
      userId,
    },
    include: {
      _count: {
        select: {
          collections: true,
          articles: true,
        },
      },
    },
  });
};
