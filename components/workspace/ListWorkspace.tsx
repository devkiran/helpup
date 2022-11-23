import dayjs from "dayjs";
import Link from "next/link";
import { IconExternalLink, IconSettings } from "@tabler/icons";
import {
  Group,
  Loader,
  Text,
  Card,
  Badge,
  Button,
  Grid,
  Stack,
  Box,
} from "@mantine/core";

import useWorkspaces from "@lib/hooks/useWorkspaces";
import EmptyState from "@components/core/EmptyState";

const ListWorkspace = () => {
  const { workspaces, isLoading } = useWorkspaces();

  if (isLoading || !workspaces) {
    return <Loader />;
  }

  if (workspaces.length === 0) {
    return (
      <EmptyState title="No workspaces found." buttonText="Create Workspace" />
    );
  }

  return (
    <Grid>
      {workspaces.map((workspace) => {
        return (
          <Grid.Col key={workspace.id} lg={4} md={6} sm={6} xs={12}>
            <Card withBorder>
              <Stack spacing={20}>
                <Group position="apart">
                  <Text weight={500}>{workspace.name}</Text>
                  <Badge color="green" variant="light">
                    Active
                  </Badge>
                </Group>
                <Text size="sm" color="dimmed">
                  {`${workspace._count.collections} Collections • ${workspace._count.articles} Articles`}
                </Text>
                <Box>
                  <Grid>
                    <Grid.Col span={6}>
                      <Button
                        component={Link}
                        href={`/workspaces/${workspace.id}/collections`}
                        variant="outline"
                        size="xs"
                        color="cyan"
                        leftIcon={<IconSettings />}
                        fullWidth
                      >
                        Manage
                      </Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Button
                        component={Link}
                        href={`/docs/${workspace.slug}`}
                        variant="outline"
                        size="xs"
                        color="cyan"
                        leftIcon={<IconExternalLink />}
                        target="_blank"
                        fullWidth
                      >
                        View on portal
                      </Button>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default ListWorkspace;
