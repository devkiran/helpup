import { useRouter } from "next/router";
import { Container } from "@mantine/core";
import type { GetServerSidePropsContext } from "next";

import { Article, Workspace } from "@prisma/client";
import { getArticle } from "@lib/server/article";
import Feedback from "@components/docs/Feedback";
import ArticleInfo from "@components/docs/Article";
import { getWorkspace } from "@lib/server/workspace";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";

const Article = ({
  article,
  workspace,
}: {
  article: Article;
  workspace: Workspace;
}) => {
  const router = useRouter();

  const { workspaceSlug } = router.query as { workspaceSlug: string };

  return (
    <>
      <ArticleSearchBar workspace={workspace} />
      <Container size="md" px="xl" py="xl" className="bg-gray-50">
        <ArticleInfo article={article} />
        <Feedback article={article} />
      </Container>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { workspaceSlug, articleSlug } = context.query as {
    workspaceSlug: string;
    articleSlug: string;
  };

  const workspace = await getWorkspace(workspaceSlug);

  if (!workspace) {
    return {
      notFound: true,
    };
  }

  const article = await getArticle({
    workspaceId: workspace.id,
    slug: articleSlug,
  });

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
      workspace: JSON.parse(JSON.stringify(workspace)),
    },
  };
}

export default Article;
