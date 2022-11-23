import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Group, Title } from "@mantine/core";

import ListArticles from "@components/articles/ListArticles";
import AppShellLayout from "@components/layouts/AppShellLayout";

const Articles = () => {
  const router = useRouter();

  const { workspaceId } = router.query as {
    workspaceId: string;
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Group position="apart">
          <Title order={3}>Articles</Title>
          <Button
            href={`/workspaces/${workspaceId}/articles/new`}
            component={Link}
            variant="outline"
          >
            Create Article
          </Button>
        </Group>
        <Box mt="md">
          <ListArticles workspaceId={workspaceId} />
        </Box>
      </div>
    </main>
  );
};

Articles.getLayout = function getLayout(page: React.ReactNode) {
  return <AppShellLayout>{page}</AppShellLayout>;
};

export default Articles;
