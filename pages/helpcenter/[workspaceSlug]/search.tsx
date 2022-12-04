import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";

import { Article, Workspace } from "@prisma/client";
import { getWorkspace } from "@lib/server/workspace";
import ListArticles from "@components/docs/ListArticles";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";
import { getHelpCenterUrl } from "@lib/urls";

const Search = ({
  articles,
  workspace,
}: {
  articles: Article[];
  workspace: Workspace;
}) => {
  const router = useRouter();

  const { workspaceSlug, q } = router.query as {
    workspaceSlug: string;
    q: string;
  };

  return (
    <>
      <Head>
        <title>
          Search results for "{q}" | {workspace.siteName}
        </title>
      </Head>
      <ArticleSearchBar workspace={workspace} q={q} />
      <ListArticles
        workspaceSlug={workspaceSlug}
        searchTerm={q}
        articles={articles}
      />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { workspaceSlug, q: searchTerm } = context.query as {
    workspaceSlug: string;
    q: string;
  };

  if (!searchTerm) {
    return {
      redirect: {
        permanent: false,
        destination: getHelpCenterUrl(workspaceSlug),
      },
    };
  }

  const workspace = await getWorkspace(workspaceSlug);

  if (!workspace) {
    return {
      notFound: true,
    };
  }

  // Call Atlas endpoint to search for articles
  const url = new URL(
    `${process.env.NEXT_PUBLIC_ATLAS_APP_URL}/searchArticles`
  );

  url.searchParams.set("searchTerm", searchTerm);
  url.searchParams.set("workspaceId", workspace.id);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const articles = await response.json();

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      workspace: JSON.parse(JSON.stringify(workspace)),
    },
  };
}

export default Search;
