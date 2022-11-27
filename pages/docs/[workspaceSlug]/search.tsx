import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";

import { Article } from "@prisma/client";
import { searchArticles } from "@lib/server/article";
import ListArticles from "@components/docs/ListArticles";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";
import { getWorkspace } from "@lib/server/workspace";

const Search = ({ articles }: { articles: Article[] }) => {
  const router = useRouter();

  const { workspaceSlug, q } = router.query as {
    workspaceSlug: string;
    q: string;
  };

  return (
    <>
      <ArticleSearchBar workspaceSlug={workspaceSlug} q={q} />
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

  const { id: workspaceId } = workspace;

  const articles = await searchArticles(workspaceId, q);

  console.log({ articles });

  return {
    props: { articles: JSON.parse(JSON.stringify(articles)) },
  };
}

export default Search;
