import { Title, Paper, Text, Avatar, Anchor } from "@mantine/core";

import { Collection, Article } from "@prisma/client";
import { getCollectionUrl } from "@lib/urls";

const CollectionCard = ({
  collection,
  workspaceSlug,
}: {
  collection: Collection & { articles: Article[] };
  workspaceSlug: string;
}) => {
  return (
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
        <Anchor href={getCollectionUrl(workspaceSlug, collection.slug)}>
          {collection.articles.length} articles
        </Anchor>
      </div>
    </Paper>
  );
};

export default CollectionCard;
