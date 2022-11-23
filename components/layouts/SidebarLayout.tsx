import type { NavigationItem } from "../../types";
import Navbar from "@components/core/Navbar";

const SidebarLayout = ({
  navigations,
  children,
}: {
  navigations: NavigationItem[];
  children: React.ReactNode;
}) => {
  return (
    <>
      <main className="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <Navbar navigations={navigations} />
          <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0 px-3">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default SidebarLayout;
