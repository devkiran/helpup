const path = "helpcenter";

export const getHelpCenterUrl = (workspaceSlug: string) => {
  return `/${path}/${workspaceSlug}`;
};

export const getCollectionUrl = (
  workspaceSlug: string,
  collectionSlug: string
) => {
  return `/${path}/${workspaceSlug}/collections/${collectionSlug}`;
};

export const getArticleUrl = (workspaceSlug: string, articleSlug: string) => {
  return `/${path}/${workspaceSlug}/articles/${articleSlug}`;
};

export const getSearchUrl = (workspaceSlug: string) => {
  return `/${path}/${workspaceSlug}/search`;
};
