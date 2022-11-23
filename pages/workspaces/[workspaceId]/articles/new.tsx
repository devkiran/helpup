import { useRouter } from "next/router";

import AppShellLayout from "@components/layouts/AppShellLayout";
import CreateNewArticle from "@components/articles/CreateNewArticle";

const NewArticle = () => {
  const router = useRouter();

  const { workspaceId } = router.query as { workspaceId: string };

  return (
    <main>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <CreateNewArticle workspaceId={workspaceId} />
      </div>
    </main>
  );
};

NewArticle.getLayout = function getLayout(page: React.ReactNode) {
  return <AppShellLayout>{page}</AppShellLayout>;
};

export default NewArticle;
