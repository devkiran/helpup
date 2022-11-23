import useSWR, { mutate } from "swr";

import fetcher from "@lib/client/fetcher";
import { ApiResponse } from "../../types";
import { Collection } from "@prisma/client";

type CollectionWithArticlesCount = Collection & {
  _count: { articles: number };
};

const useCollections = (workspaceId: string) => {
  const url = `/api/workspaces/${workspaceId}/collections`;

  const { data, error } = useSWR<ApiResponse<CollectionWithArticlesCount[]>>(
    workspaceId ? url : null,
    fetcher
  );

  const mutateCollections = async () => {
    mutate(url);
  };

  return {
    isLoading: !error && !data,
    isError: error,
    collections: data?.data,
    mutateCollections,
  };
};

export default useCollections;
