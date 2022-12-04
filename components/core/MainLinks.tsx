import { IconSettings, IconFolders, IconLogout } from "@tabler/icons";

import { MainLink } from "./MainLink";

type MainLinksProps = {
  currentPath: string;
};

export const MainLinks = (props: MainLinksProps) => {
  const { currentPath } = props;

  const menus = [
    {
      icon: <IconFolders size={16} />,
      color: "red",
      label: "Workspaces",
      href: "/workspaces",
      active: currentPath === "/workspaces",
    },
    {
      icon: <IconSettings size={16} />,
      color: "teal",
      label: "Account",
      href: "/account",
      active: currentPath === "/account",
    },
    {
      icon: <IconLogout size={16} />,
      color: "blue",
      label: "Sign out",
      href: "/signout",
      active: currentPath === "/signout",
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
