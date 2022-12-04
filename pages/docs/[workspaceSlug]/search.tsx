import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";

import { Article, Workspace } from "@prisma/client";
import { searchArticles } from "@lib/server/atlas";
import { getWorkspace } from "@lib/server/workspace";
import ListArticles from "@components/docs/ListArticles";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";

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
  const { workspaceSlug, q } = context.query as {
    workspaceSlug: string;
    q: string;
  };

  if (!q) {
    return {
      redirect: {
        permanent: false,
        destination: `/docs/${workspaceSlug}`,
      },
    };
  }

  const workspace = await getWorkspace(workspaceSlug);

  if (!workspace) {
    return {
      notFound: true,
    };
  }

  const articles = await searchArticles(q, workspace.id);

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      workspace: JSON.parse(JSON.stringify(workspace)),
    },
  };
}

export default Search;
