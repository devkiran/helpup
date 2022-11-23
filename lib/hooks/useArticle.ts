import useSWR from "swr";

import fetcher from "@lib/client/fetcher";
import { ApiResponse } from "../../types";
import { Article } from "@prisma/client";

const useArticle = (workspaceId: string, articleId: string) => {
  const url = `/api/workspaces/${workspaceId}/articles/${articleId}`;

  const { data, error } = useSWR<ApiResponse<Article>>(
    workspaceId ? url : null,
    fetcher
  );

  return {
    isLoading: !error && !data,
    isError: error,
    article: data?.data,
  };
};

export default useArticle;
