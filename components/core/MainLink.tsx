import Link from "next/link";
import { ThemeIcon, Group, Text } from "@mantine/core";

type MainLinkProps = {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
  active: boolean;
};

export const MainLink = (props: MainLinkProps) => {
  const { icon, color, label, href, active } = props;

  const activeClass = active ? "bg-gray-300" : "hover:bg-gray-100";

  return (
    <Link href={href} className={`flex w-full rounded-md p-2 ${activeClass}`}>
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </Link>
  );
};
