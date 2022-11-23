import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { useForm, yupResolver } from "@mantine/form";
import { Stack, TextInput, Button, Group, Select } from "@mantine/core";

import { showError, showSuccess } from "@lib/client/notification";
import { ArticleEditor } from "@components/articles/ArticleEditor";
import useCollections from "@lib/hooks/useCollections";

const CreateNewArticle = ({ workspaceId }: { workspaceId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { collections } = useCollections(workspaceId);

  const editor = useEditor({
    extensions: [StarterKit, Highlight],
    content: "Type your content here...",
  });

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      title: "",
      collectionId: "",
    },
  });

  const handleSubmit = async ({ title, collectionId }: typeof form.values) => {
    const contentText = editor?.getText();
    const contentHtml = editor?.getHTML();

    setLoading(true);

    const response = await fetch(`/api/workspaces/${workspaceId}/articles`, {
      method: "POST",
      body: JSON.stringify({ collectionId, title, contentText, contentHtml }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    const jsonResponse = await response.json();

    if (!response.ok) {
      showError(jsonResponse.error.message);
    } else {
      showSuccess("Article created successfully");
      form.reset();
      router.push(
        `/workspaces/${workspaceId}/articles/${jsonResponse.data.id}`
      );
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
          <Button color="cyan" type="submit" loading={loading}>
            Save
          </Button>
        </Group>
        <TextInput
          placeholder="Title"
          {...form.getInputProps("title")}
          required
          autoFocus
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

export default CreateNewArticle;

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  collectionId: Yup.string().required("Collection is required"),
});
