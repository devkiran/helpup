import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "@mantine/core";
import type { GetServerSidePropsContext } from "next";

import prisma from "@lib/prisma";
import { Collection, Article, Workspace } from "@prisma/client";
import { getWorkspace } from "@lib/server/workspace";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";
import CollectionCard from "@components/docs/CollectionCard";

type ArticleWithCollection = Collection & { articles: Article[] };

const Home = ({
  collections,
  workspace,
}: {
  collections: ArticleWithCollection[];
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
      <Container size="xl" px="xl" py="xl" className="bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 gap-6">
          {collections.map((collection) => (
            <CollectionCard
              collection={collection}
              workspaceSlug={workspaceSlug}
              key={collection.id}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { workspaceSlug } = context.query as {
    workspaceSlug: string;
  };

  const workspace = await getWorkspace(workspaceSlug);

  if (!workspace) {
    return {
      notFound: true,
    };
  }

  const collections = await prisma.collection.findMany({
    where: {
      workspaceId: workspace.id,
    },
    include: {
      articles: true,
    },
  });

  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
      workspace: JSON.parse(JSON.stringify(workspace)),
    },
  };
}

export default Home;
