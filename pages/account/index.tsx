import AppShellLayout from "@components/layouts/AppShellLayout";
import UpdateEmail from "@components/account/UpdateEmail";
import UpdateName from "@components/account/UpdateProfile";
import UpdatePassword from "@components/account/UpdatePassword";

const Account = () => {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <UpdateName />
            <UpdateEmail />
            <UpdatePassword />
          </div>
        </div>
      </div>
    </main>
  );
};

Account.getLayout = (page: React.ReactNode) => {
  return <AppShellLayout>{page}</AppShellLayout>;
};

export default Account;
