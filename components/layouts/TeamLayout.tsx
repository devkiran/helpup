import { useRouter } from "next/router";

import type { Team } from "../../types";
import SidebarLayout from "./SidebarLayout";

const TeamLayout = ({
  team,
  children,
}: {
  team: Team;
  children: React.ReactNode;
}) => {
  const { asPath } = useRouter();

  const navigations = [
    {
      name: "General",
      href: `/account/teams/${team.id}`,
      current: asPath === `/account/teams/${team.id}`,
    },
    {
      name: "People",
      href: `/account/teams/${team.id}/people`,
      current: asPath === `/account/teams/${team.id}/people`,
    },
    {
      name: "Invoices",
      href: `/account/teams/${team.id}/invoices`,
      current: asPath === `/account/teams/${team.id}/invoices`,
    },
    {
      name: "Billing",
      href: `/account/teams/${team.id}/billing`,
      current: asPath === `/account/teams/${team.id}/billing`,
    },
  ];

  return <SidebarLayout navigations={navigations}>{children}</SidebarLayout>;
};

export default TeamLayout;
