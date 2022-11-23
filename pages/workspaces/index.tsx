import { useState } from "react";
import { Box, Button, Group, Title } from "@mantine/core";

import AppShellLayout from "@components/layouts/AppShellLayout";
import ListWorkspace from "@components/workspace/ListWorkspace";
import CreateWorkspace from "@components/workspace/CreateWorkspace";

const Workspaces = () => {
  const [opened, setOpened] = useState(false);

  return (
    <main>
      <CreateWorkspace opened={opened} setOpened={setOpened} />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Group position="apart">
          <Title order={3}>Workspaces</Title>
          <Button onClick={() => setOpened(true)}>Create Workspace</Button>
        </Group>
        <Box mt="md">
          <ListWorkspace />
        </Box>
      </div>
    </main>
  );
};

Workspaces.getLayout = function getLayout(page: React.ReactNode) {
  return <AppShellLayout>{page}</AppShellLayout>;
};

export default Workspaces;
