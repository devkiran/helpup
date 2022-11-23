import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Group, Title, Loader, Breadcrumbs } from "@mantine/core";

import AppShellLayout from "@components/layouts/AppShellLayout";
import CreateCollection from "@components/collections/CreateCollection";
import ListCollection from "@components/collections/ListCollection";

const Collections = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  const { workspaceId } = router.query as { workspaceId: string };

  return (
    <main>
      <CreateCollection
        opened={opened}
        setOpened={setOpened}
        workspaceId={workspaceId}
      />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Group position="apart">
          <Title order={3}>Collections</Title>
          <Group>
            <Button onClick={() => setOpened(true)} variant="outline">
              Create Collection
            </Button>
            <Button
              component={Link}
              href={`/workspaces/${workspaceId}/articles`}
              variant="outline"
            >
              All Articles
            </Button>
          </Group>
        </Group>
        <Box mt="md">
          <ListCollection workspaceId={workspaceId} />
        </Box>
      </div>
    </main>
  );
};

Collections.getLayout = function getLayout(page: React.ReactNode) {
  return <AppShellLayout>{page}</AppShellLayout>;
};

export default Collections;
