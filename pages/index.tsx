import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/workspaces");
  }, []);

  return (
    <>
      <p>Redirecting to /workspaces ....</p>
    </>
  );
};

export default Home;
