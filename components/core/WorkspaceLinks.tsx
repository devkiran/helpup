import {
  IconArticle,
  IconFolders,
  IconSettings,
  IconChartAreaLine,
} from "@tabler/icons";

import { MainLink } from "./MainLink";

type WorkspaceLinksProps = {
  workspaceId: string;
  currentPath: string;
};

export const WorkspaceLinks = (props: WorkspaceLinksProps) => {
  const { workspaceId, currentPath } = props;

  const menus = [
    {
      icon: <IconFolders size={24} />,
      color: "yellow",
      label: "All Workspaces",
      href: "/workspaces",
      active: currentPath === `/workspaces`,
    },
    {
      icon: <IconArticle size={24} />,
      color: "red",
      label: "Articles",
      href: `/workspaces/${workspaceId}/articles`,
      active: currentPath.startsWith(`/workspaces/${workspaceId}/articles`),
    },
    {
      icon: <IconFolders size={24} />,
      color: "green",
      label: "Collections",
      href: `/workspaces/${workspaceId}/collections`,
      active: currentPath.startsWith(`/workspaces/${workspaceId}/collections`),
    },
    {
      icon: <IconSettings size={24} />,
      color: "violet",
      label: "Settings",
      href: `/workspaces/${workspaceId}/settings`,
      active: currentPath === `/workspaces/${workspaceId}/settings`,
    },
  ] as const;

  return (
    <div className="space-y-1">
      {menus.map((link) => (
        <MainLink {...link} key={link.label} />
      ))}
    </div>
  );
};
