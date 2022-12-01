export const searchArticles = async (
  searchTerm: string,
  workspaceId: string
) => {
  const url = new URL(`${process.env.ATLAS_APP_URL}/endpoint/searchArticles`);

  url.searchParams.set("searchTerm", searchTerm);
  url.searchParams.set("workspaceId", workspaceId);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const autocompleteArticles = async (
  searchTerm: string,
  workspaceId: string
) => {
  const url = new URL(
    `${process.env.ATLAS_APP_URL}/endpoint/autocompleteArticles`
  );

  url.searchParams.set("searchTerm", searchTerm);
  url.searchParams.set("workspaceId", workspaceId);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};
