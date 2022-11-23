import { useState } from "react";
import { Box, Button, Group, Title } from "@mantine/core";

import AppShellLayout from "@components/layouts/AppShellLayout";

const Settings = () => {
  return (
    <main>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Group position="apart">
          <Title order={3}>Workspaces Settings</Title>
        </Group>
        <Box mt="md">Content</Box>
      </div>
    </main>
  );
};

Settings.getLayout = function getLayout(page: React.ReactNode) {
  return <AppShellLayout>{page}</AppShellLayout>;
};

export default Settings;
