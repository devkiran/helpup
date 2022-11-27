import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { useForm, yupResolver } from "@mantine/form";
import { Stack, TextInput, Button, Group, Select, Loader } from "@mantine/core";

import { showError, showSuccess } from "@lib/client/notification";
import { ArticleEditor } from "@components/articles/ArticleEditor";
import useCollections from "@lib/hooks/useCollections";
import useArticle from "@lib/hooks/useArticle";
import DeleteArticle from "@components/articles/DeleteArticle";

const UpdateArticle = ({
  workspaceId,
  articleId,
}: {
  workspaceId: string;
  articleId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const { collections } = useCollections(workspaceId);
  const { article, isLoading } = useArticle(workspaceId, articleId);

  const editor = useEditor({
    extensions: [StarterKit, Highlight],
  });

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      title: "",
      collectionId: "",
    },
  });

  useEffect(() => {
    if (editor && article) {
      form.setValues({
        title: article.title,
        collectionId: article.collectionId,
      });

      editor.commands.setContent(article.contentHtml);
    }
  }, [article, editor]);

  if (isLoading) {
    return <Loader />;
  }

  const handleSubmit = async ({ title, collectionId }: typeof form.values) => {
    const contentText = editor?.getText();
    const contentHtml = editor?.getHTML();

    setLoading(true);

    const response = await fetch(
      `/api/workspaces/${workspaceId}/articles/${articleId}`,
      {
        method: "PUT",
        body: JSON.stringify({ title, contentText, contentHtml, collectionId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setLoading(false);

    const { error } = await response.json();

    if (!response.ok) {
      showError(error.message);
    } else {
      showSuccess("Article updated");
    }
  };

  const collectionOptions = collections
    ? collections.map((collection) => ({
        label: collection.title,
        value: collection.id,
      }))
    : [];

  return (
    <form method="POST" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Group position="right">
          <DeleteArticle workspaceId={workspaceId} articleId={articleId} />
          <Button color="cyan" type="submit" loading={loading}>
            Save
          </Button>
        </Group>
        <TextInput
          placeholder="Title"
          {...form.getInputProps("title")}
          required
        />
        <Select
          placeholder="Choose a collection"
          data={collectionOptions}
          {...form.getInputProps("collectionId")}
          required
        />
        <ArticleEditor editor={editor} />
      </Stack>
    </form>
  );
};

export default UpdateArticle;

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  collectionId: Yup.string().required("Collection is required"),
});
