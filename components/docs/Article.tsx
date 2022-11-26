import { Paper, Stack, Title } from "@mantine/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Article } from "@prisma/client";

const Article = ({ article }: { article: Article }) => {
  const editor = useEditor({
    content: article.contentHtml,
    editable: false,
    extensions: [StarterKit],
  });

  return (
    <Paper p={50} withBorder>
      <Stack>
        <Title order={2} weight={500}>
          {article.title}
        </Title>
        <div>
          <EditorContent editor={editor} />
        </div>
      </Stack>
    </Paper>
  );
};

export default Article;
