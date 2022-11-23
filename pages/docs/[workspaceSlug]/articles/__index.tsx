import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import { Title, Container, Paper, Text, Stack } from "@mantine/core";

import { Article } from "@prisma/client";
import { getAllArticles } from "@lib/server/article";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";

const Articles = ({ articles }: { articles: Article[] }) => {
  const router = useRouter();

  const { workspaceId } = router.query as { workspaceId: string };

  return (
    <>
      <ArticleSearchBar workspaceId={workspaceId} />
      <Container size="md" px="xl" py="xl">
        <Stack>
          {articles.map((article) => (
            <Link
              href={`/workspaces/${workspaceId}/articles/${article.slug}`}
              key={article.title}
            >
              <Paper shadow="xs" p="lg">
                <Stack spacing={10}>
                  <Title order={4} color="blue" weight={400}>
                    {article.title}
                  </Title>
                  <Text color="dimmed" fz="sm" lineClamp={2}>
                    {article.contentText}
                  </Text>
                  <Text color="dimmed" fz="sm">
                    {`Last updated on ${article.updatedAt}`}
                  </Text>
                </Stack>
              </Paper>
            </Link>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { workspaceId } = context.query as { workspaceId: string };

  const articles = await getAllArticles(workspaceId);

  return {
    props: { articles: JSON.parse(JSON.stringify(articles)) },
  };
}

export default Articles;
