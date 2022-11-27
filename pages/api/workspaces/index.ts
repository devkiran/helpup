import type { NextApiRequest, NextApiResponse } from "next";

import { getUser } from "@lib/server/user";

import {
  createWorkspace,
  getWorkspace,
  getAllWorkspaces,
} from "@lib/server/workspace";
import { slugify } from "@lib/slugify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGET(req, res);
    case "POST":
      return handlePOST(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({
        data: null,
        error: { message: `Method ${method} Not Allowed` },
      });
  }
}

const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUser(req, res);

  const workspaces = await getAllWorkspaces(user.id);

  res.status(200).json({ data: workspaces });
};

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.body as { name: string };

  const slug = slugify(name);

  if (await getWorkspace(slug)) {
    return res.status(409).json({
      error: { message: `Workspace with name ${name} already exists` },
    });
  }

  const user = await getUser(req, res);

  const workspace = await createWorkspace({ name, slug, userId: user.id });

  res.status(201).json({ data: workspace });
};
