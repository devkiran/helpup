import Link from "next/link";
import { Title, Container, Paper, Text, Stack, Highlight } from "@mantine/core";

import { formatDate } from "@lib/date";
import { Article } from "@prisma/client";

const ListArticles = ({
  workspaceSlug,
  searchTerm,
  articles,
}: {
  workspaceSlug: string;
  searchTerm?: string;
  articles: Article[];
}) => {
  return (
    <Container size="md" px="xl" py="xl">
      <Stack>
        {articles.length === 0 ? (
          <Text color="dimmed" fz="sm" lineClamp={2}>
            {searchTerm
              ? `We couldn't find any articles for: ${searchTerm}`
              : "No articles yet"}
          </Text>
        ) : (
          articles.map((article) => (
            <Link
              href={`/docs/${workspaceSlug}/articles/${article.slug}`}
              key={article.title}
            >
              <Paper shadow="xs" p="lg">
                <Stack spacing={10}>
                  <Title order={4} color="blue" weight={400}>
                    {searchTerm ? (
                      <TextWithHighlight
                        searchTerm={searchTerm}
                        text={article.title}
                      />
                    ) : (
                      article.title
                    )}
                  </Title>
                  <Text color="dimmed" fz="sm" lineClamp={2}>
                    {searchTerm ? (
                      <TextWithHighlight
                        searchTerm={searchTerm}
                        text={article.contentText}
                      />
                    ) : (
                      article.contentText
                    )}
                  </Text>
                  <Text color="dimmed" fz="sm">
                    {/* @ts-ignore */}
                    {`Last updated on ${formatDate(article.updatedAt.$date)}`}
                  </Text>
                </Stack>
              </Paper>
            </Link>
          ))
        )}
      </Stack>
    </Container>
  );
};

export default ListArticles;

const TextWithHighlight = ({
  searchTerm,
  text,
}: {
  searchTerm: string;
  text: string;
}) => {
  return <Highlight highlight={searchTerm}>{text}</Highlight>;
};
