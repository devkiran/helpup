import { useRouter } from "next/router";

import SidebarLayout from "./SidebarLayout";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const { asPath } = useRouter();

  const navigations = [
    { name: "Account", href: "/account", current: asPath === "/account" },
    {
      name: "Billing",
      href: "/account/billing",
      current: asPath === "/account/billing",
    },
    {
      name: "Invoices",
      href: "/account/invoices",
      current: asPath === "/account/invoices",
    },
    {
      name: "Team",
      href: "/account/teams",
      current: asPath === "/account/teams",
    },
  ];

  return (
    <>
      <SidebarLayout navigations={navigations}>{children}</SidebarLayout>
    </>
  );
};

export default AccountLayout;
