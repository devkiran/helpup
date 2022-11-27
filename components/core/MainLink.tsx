import React from "react";
import Link from "next/link";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { IconSettings, IconFolders } from "@tabler/icons";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

const menus = [
  {
    icon: <IconFolders size={16} />,
    color: "red",
    label: "Workspaces",
    href: "/workspaces",
  },
  {
    icon: <IconSettings size={16} />,
    color: "teal",
    label: "Account",
    href: "/account",
  },
];

function MainLink({ icon, color, label, href }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
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
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">
          <Link href={href}>{label}</Link>
        </Text>
      </Group>
    </UnstyledButton>
  );
}

export function MainLinks() {
  return (
    <>
      {menus.map((link) => (
        <MainLink {...link} key={link.label} />
      ))}
    </>
  );
}
