import useSWR, { mutate } from "swr";

import fetcher from "@lib/client/fetcher";
import { ApiResponse } from "../../types";
import { Workspace } from "@prisma/client";

const useWorkspaces = () => {
  const url = `/api/workspaces`;

  const { data, error } = useSWR<ApiResponse<Workspace[]>>(url, fetcher);

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
