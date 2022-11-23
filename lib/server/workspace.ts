import prisma from "@lib/prisma";
import { Workspace } from "@prisma/client";

const userId = "d29997b6-8783-4dff-9023-d9271ea8d78f";

export const createWorkspace = async (
  data: Pick<Workspace, "name" | "slug">
): Promise<Workspace> => {
  const { name, slug } = data;

  return await prisma.workspace.create({
    data: {
      name,
      slug,
      userId,
    },
  });
};

export const getWorkspace = async (slug: string): Promise<Workspace | null> => {
  return await prisma.workspace.findUnique({
    where: { slug },
  });
};

export const getAllWorkspaces = async (): Promise<Workspace[] | null> => {
  // TODO: _count is not working

  return await prisma.workspace.findMany({
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
