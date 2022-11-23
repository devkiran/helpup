import useSWR, { mutate } from "swr";

import fetcher from "@lib/client/fetcher";
import { ApiResponse } from "../../types";
import { Workspace } from "@prisma/client";

type WorkspaceWithCount = Workspace & {
  _count: { collections: number; articles: number };
};

const useWorkspaces = () => {
  const url = `/api/workspaces`;

  const { data, error } = useSWR<ApiResponse<WorkspaceWithCount[]>>(
    url,
    fetcher
  );

  const mutateWorkspaces = async () => {
    mutate(url);
  };

  return {
    isLoading: !error && !data,
    isError: error,
    workspaces: data?.data,
    mutateWorkspaces,
  };
};

export default useWorkspaces;
