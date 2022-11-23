import AccountLayout from "@components/layouts/AccountLayout";
import AppLayout from "@components/layouts/AppLayout";

const Teams = () => {
  return <>Team</>;
};

Teams.getLayout = (page: React.ReactNode) => {
  return (
    <AppLayout title="Billing">
      <AccountLayout>{page}</AccountLayout>
    </AppLayout>
  );
};

export default Teams;
