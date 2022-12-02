import useSWR, { mutate } from "swr";

import fetcher from "@lib/client/fetcher";
import { ApiResponse } from "../../types";
import { Workspace } from "@prisma/client";

const useWorkspace = (workspaceId: string) => {
  const url = `/api/workspaces/${workspaceId}`;

  const { data, error } = useSWR<ApiResponse<Workspace>>(
    workspaceId ? url : null,
    fetcher
  );

  const mutateWorkspace = async () => {
    mutate(url);
  };

  return {
    isLoading: !error && !data,
    isError: error,
    workspace: data?.data,
    mutateWorkspace,
  };
};

export default useWorkspace;
