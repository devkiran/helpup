import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import { Container, Paper, Stack, Title } from "@mantine/core";
import { EditorContent, useEditor } from "@tiptap/react";

import { Article } from "@prisma/client";
import { getArticle } from "@lib/server/article";
import { getWorkspace } from "@lib/server/workspace";
import ArticleSearchBar from "@components/docs/ArticleSearchBar";
import StarterKit from "@tiptap/starter-kit";
const Article = ({ article }: { article: Article }) => {
  const router = useRouter();

  const { workspaceSlug } = router.query as { workspaceSlug: string };

  const editor = useEditor({
    content: article.contentHtml,
    editable: false,
    extensions: [StarterKit],
  });

  return (
    <>
      <ArticleSearchBar workspaceSlug={workspaceSlug} />
      <Container size="lg" px="xl" py="xl" className="bg-gray-50">
        <Paper p={50} withBorder>
          <Stack>
            <Title order={1} weight={500}>
              {article.title}
            </Title>
            <div>
              <EditorContent editor={editor} />
            </div>
            {/* <div
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              className="prose lg:prose-xl"
            /> */}
          </Stack>
        </Paper>
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
    props: { article: JSON.parse(JSON.stringify(article)) },
  };
}

export default Article;
