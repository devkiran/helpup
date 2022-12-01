import type { NextApiRequest, NextApiResponse } from "next";

import { getWorkspace } from "@lib/server/workspace";
import { autocompleteArticles } from "@lib/server/atlas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGET(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchTerm, workspaceId } = req.query as {
    searchTerm: string;
    workspaceId: string; // This is a workspace slug
  };

  const workspace = await getWorkspace(workspaceId);

  if (!workspace) {
    return res.status(404).json({
      error: { message: `Workspace ${workspaceId} not found` },
    });
  }

  const articles = await autocompleteArticles(searchTerm, workspace.id);

  res.status(200).json({ data: articles });
};
