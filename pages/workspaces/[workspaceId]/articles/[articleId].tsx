import { useRouter } from "next/router";

import UpdateArticle from "@components/articles/UpdateArticle";
import AppShellLayout from "@components/layouts/AppShellLayout";

const UpdateArticlePage = () => {
  const router = useRouter();

  const { workspaceId, articleId } = router.query as {
    workspaceId: string;
    articleId: string;
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <UpdateArticle workspaceId={workspaceId} articleId={articleId} />
      </div>
    </main>
  );
};

UpdateArticlePage.getLayout = function getLayout(page: React.ReactNode) {
  return <AppShellLayout>{page}</AppShellLayout>;
};

export default UpdateArticlePage;
