import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";

import { getArticle } from "@lib/server/article";
import { getWorkspace } from "@lib/server/workspace";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";
import ArticleInfo from "@components/docs/Article";
import { Article } from "@prisma/client";

const Article = ({ article }: { article: Article }) => {
  const router = useRouter();

  const { workspaceSlug } = router.query as { workspaceSlug: string };

  return (
    <>
      <ArticleSearchBar workspaceSlug={workspaceSlug} />
      <ArticleInfo article={article} />
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
    props: { article: JSON.parse(JSON.stringify(article)) },
  };
}

export default Article;
