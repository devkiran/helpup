import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";

import { Article } from "@prisma/client";
import { getWorkspace } from "@lib/server/workspace";
import { getAllArticlesByCollection } from "@lib/server/article";
import { getCollection } from "@lib/server/collection";
import ListArticles from "@components/docs/ListArticles";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";

const Home = ({ articles }: { articles: Article[] }) => {
  const router = useRouter();

  const { workspaceSlug } = router.query as { workspaceSlug: string };

  return (
    <>
      <ArticleSearchBar workspaceSlug={workspaceSlug} />
      <ListArticles workspaceSlug={workspaceSlug} articles={articles} />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { workspaceSlug, collectionSlug } = context.query as {
    workspaceSlug: string;
    collectionSlug: string;
  };

  const workspace = await getWorkspace(workspaceSlug);

  if (!workspace) {
    return {
      notFound: true,
    };
  }

  const { id: workspaceId } = workspace;

  const collection = await getCollection({
    workspaceId,
    slug: collectionSlug,
  });

  if (!collection) {
    return {
      notFound: true,
    };
  }

  const articles = await getAllArticlesByCollection(collection.id);

  return {
    props: { articles: JSON.parse(JSON.stringify(articles)) },
  };
}

export default Home;
