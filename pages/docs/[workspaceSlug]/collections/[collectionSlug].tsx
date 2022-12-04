import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";

import prisma from "@lib/prisma";
import { Article, Workspace } from "@prisma/client";
import { getWorkspace } from "@lib/server/workspace";
import { getCollection } from "@lib/server/collection";
import ListArticles from "@components/docs/ListArticles";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";

const Home = ({
  articles,
  workspace,
}: {
  articles: Article[];
  workspace: Workspace;
}) => {
  const router = useRouter();

  const { workspaceSlug } = router.query as { workspaceSlug: string };

  return (
    <>
      <Head>
        <title>{workspace.siteName}</title>
      </Head>
      <ArticleSearchBar workspace={workspace} />
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

  const articles = await prisma.article.findMany({
    where: { collectionId: collection.id },
  });

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
      workspace: JSON.parse(JSON.stringify(workspace)),
    },
  };
}

export default Home;
