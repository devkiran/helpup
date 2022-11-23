import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

import SignIn from "@components/auth/SignIn";

const SignInPage = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return <SignIn />;
};

export default SignInPage;
