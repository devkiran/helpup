import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import { Title, Container, Paper, Text, Avatar, Anchor } from "@mantine/core";

import prisma from "@lib/prisma";
import { Collection, Article } from "@prisma/client";
import { getWorkspace } from "@lib/server/workspace";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";

type ArticleWithCollection = Collection & { articles: Article[] };

const Home = ({ collections }: { collections: ArticleWithCollection[] }) => {
  const router = useRouter();

  const { workspaceSlug } = router.query as { workspaceSlug: string };

  return (
    <>
      <ArticleSearchBar workspaceSlug={workspaceSlug} />
      <Container size="xl" px="xl" py="xl" className="bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 gap-6">
          {collections.map((collection) => (
            <Paper shadow="xs" p="md" key={collection.id}>
              <div className="flex flex-col items-center justify-center space-y-4 p-6">
                <Avatar color="blue" radius="xs" size="lg">
                  {collection.title[0]}
                </Avatar>
                <Title order={3} size="h4" lineClamp={1}>
                  {collection.title}
                </Title>
                <Text align="center" color="dimmed" lineClamp={2}>
                  {collection.description}
                </Text>
                <Anchor
                  href={`/docs/${workspaceSlug}/collections/${collection.slug}`}
                >
                  {collection.articles.length} articles
                </Anchor>
              </div>
            </Paper>
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

  // TODO: Fetch collections with articles count

  const collections = await prisma.collection.findMany({
    where: {
      workspaceId: workspace.id,
    },
    include: {
      articles: true,
    },
  });

  return {
    props: { collections: JSON.parse(JSON.stringify(collections)) },
  };
}

export default Home;
