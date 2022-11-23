import useSWR from "swr";

import fetcher from "@lib/client/fetcher";
import { ApiResponse } from "../../types";
import { Article, Collection } from "@prisma/client";

type ArticleWithCollection = Article & { collection: Collection };

const useArticles = (workspaceId: string) => {
  const url = `/api/workspaces/${workspaceId}/articles`;

  const { data, error } = useSWR<ApiResponse<ArticleWithCollection[]>>(
    workspaceId ? url : null,
    fetcher
  );

  return {
    isLoading: !error && !data,
    isError: error,
    articles: data?.data,
  };
};

export default useArticles;
