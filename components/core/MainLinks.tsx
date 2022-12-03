import { IconSettings, IconFolders, IconLogout } from "@tabler/icons";

import { MainLink } from "./MainLink";

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
  {
    icon: <IconLogout size={16} />,
    color: "blue",
    label: "Sign out",
    href: "/signout",
  },
] as const;

export const MainLinks = () => {
  return (
    <>
      {menus.map((link) => (
        <MainLink {...link} key={link.label} />
      ))}
    </>
  );
};
