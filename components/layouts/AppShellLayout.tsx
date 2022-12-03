import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  Group,
  Box,
  Loader,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Logo } from "@components/core/Logo";
import { MainLinks } from "@components/core/MainLinks";
import { WorkspaceLinks } from "@components/core/WorkspaceLinks";
import { WorkspaceChooser } from "@components/core/WorkspaceChooser";

const AppShellLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const { isLoading, session } = useSessionContext();

  const { workspaceId } = router.query as { workspaceId: string };

  if (isLoading) {
    return <Loader />;
  }

  if (!session) {
    router.replace("/signin");
  }

  const isWorkspace = router.pathname.startsWith("/workspaces/");

  const workspaceHasSelected = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}/articles`);
  };

  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          p="xs"
          width={{ base: 250 }}
        >
          <Navbar.Section grow mt="xs">
            {isWorkspace ? (
              <>
                <WorkspaceChooser
                  workspaceSelected={workspaceHasSelected}
                  currentWorkspaceId={workspaceId}
                />
                <WorkspaceLinks workspaceId={workspaceId} />
              </>
            ) : (
              <MainLinks />
            )}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={{ base: 50 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Group sx={{ height: "100%" }} px={20} position="apart">
              <Logo />
            </Group>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
          </div>
        </Header>
      }
      navbarOffsetBreakpoint="sm"
    >
      <Box>{children}</Box>
    </AppShell>
  );
};

export default AppShellLayout;
