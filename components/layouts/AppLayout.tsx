import Head from "next/head";
import React from "react";
import { useUser } from "@supabase/auth-helpers-react";

import Navigation from "@components/Navigation";
import SignIn from "@components/auth/SignIn";

const AppLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const user = useUser();

  // TODO: Redirect to login page if user is not logged in
  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-full">
        <Navigation />
        <div className="mx-auto max-w-6xl">{children}</div>
        <div>
          {/* <header>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold leading-tight text-gray-900">
                {title}
              </h1>
            </div>
          </header> */}
          {/* <div className="mx-auto max-w-6xl">{children}</div> */}
        </div>
      </div>
    </>
  );
};

export default AppLayout;
