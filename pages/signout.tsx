import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Skeleton } from "@mantine/core";

const SignOut = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        await supabase.auth.signOut();
        router.replace("/signin");
      })();
    }
  }, [supabase, router]);

  return (
    <>
      <Skeleton height={8} mt={6} radius="xl" />
    </>
  );
};

export default SignOut;
