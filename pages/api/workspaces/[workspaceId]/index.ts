import type { NextApiRequest, NextApiResponse } from "next";

import { getUser } from "@lib/server/user";

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
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceId } = req.query as { workspaceId: string };

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  res.status(200).json({ data: workspace });
};

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const { workspaceId } = req.query as { workspaceId: string };

  const { siteName, heading, headerColor } = req.body as {
    siteName: string;
    heading: string;
    headerColor: string;
  };

  const workspace = await prisma.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      siteName,
      heading,
      headerColor,
    },
  });

  res.status(201).json({ data: workspace });
};
