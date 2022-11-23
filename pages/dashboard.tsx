import { Button } from "@mantine/core";

import AppShellLayout from "@components/layouts/AppShellLayout";

const Dashboard = () => {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Button>Settings</Button>
        </div>
      </main>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <AppShellLayout>{page}</AppShellLayout>;
};

export default Dashboard;
