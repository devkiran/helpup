import {
  IconArticle,
  IconFolders,
  IconSettings,
  IconChartAreaLine,
} from "@tabler/icons";

import { MainLink } from "./MainLink";

export const WorkspaceLinks = ({ workspaceId }: { workspaceId: string }) => {
  const menus = [
    {
      icon: <IconFolders size={24} />,
      color: "yellow",
      label: "All Workspaces",
      href: "/workspaces",
    },
    {
      icon: <IconArticle size={24} />,
      color: "red",
      label: "Articles",
      href: `/workspaces/${workspaceId}/articles`,
    },
    {
      icon: <IconFolders size={24} />,
      color: "green",
      label: "Collections",
      href: `/workspaces/${workspaceId}/collections`,
    },
    {
      icon: <IconSettings size={24} />,
      color: "violet",
      label: "Settings",
      href: `/workspaces/${workspaceId}/settings`,
    },
    {
      icon: <IconChartAreaLine size={24} />,
      color: "red",
      label: "Analytics",
      href: `/workspaces/${workspaceId}/analytics`,
    },
  ] as const;

  return (
    <>
      {menus.map((link) => (
        <MainLink {...link} key={link.label} />
      ))}
    </>
  );
};
