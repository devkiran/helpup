import React from "react";
import { Group, Text, Avatar } from "@mantine/core";

export function Logo() {
  return (
    <Group spacing={5}>
      <Avatar color="cyan">HU</Avatar>
      <Text fw={700} size="xl">
        HelpUp
      </Text>
    </Group>
  );
}
