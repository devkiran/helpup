import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";

import prisma from "@lib/prisma";
import { Article } from "@prisma/client";
import ListArticles from "@components/docs/ListArticles";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";
import { searchArticles } from "@lib/server/article";

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

  // TODO: Filter by workspaceId

  const articles = await searchArticles(q);

  return {
    props: { articles: JSON.parse(JSON.stringify(articles)) },
  };
}

export default Search;
