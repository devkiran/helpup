import Link from "next/link";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

export const MainLink = ({ icon, color, label, href }: MainLinkProps) => {
  return (
    <Link href={href}>
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
          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};
