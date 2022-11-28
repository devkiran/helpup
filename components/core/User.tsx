import React from "react";
import { IconChevronRight } from "@tabler/icons";
import { useUser } from "@supabase/auth-helpers-react";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
} from "@mantine/core";
import type { User } from "@supabase/supabase-js";

export function User({ user }: { user: User | null }) {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar src={null} alt="Vitaly Rtishchev" color="red">
            VR
          </Avatar>
          {user && (
            <Box sx={{ flex: 1, overflow: "hidden" }}>
              <Text size="sm" weight={500} lineClamp={1}>
                {user.user_metadata.name}
              </Text>
              <Text color="dimmed" size="xs">
                {user.email}
              </Text>
            </Box>
          )}
          <IconChevronRight size={18} />
        </Group>
      </UnstyledButton>
    </Box>
  );
}
