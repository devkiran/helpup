import type { NextApiRequest, NextApiResponse } from "next";

import { autocompleteArticles } from "@lib/server/article";

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
  const { workspaceId } = req.query as {
    workspaceId: string;
  };

  const { searchTerm } = req.query as {
    searchTerm: string;
  };

  const articles = await autocompleteArticles(searchTerm);

  res.status(200).json({ data: articles });
};
