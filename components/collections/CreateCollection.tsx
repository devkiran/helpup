import * as Yup from "yup";
import { useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import {
  Button,
  Modal,
  Group,
  TextInput,
  Textarea,
  Stack,
} from "@mantine/core";

import useCollections from "@lib/hooks/useCollections";
import { showError, showSuccess } from "@lib/client/notification";

const CreateCollection = (props: Props) => {
  const { opened, setOpened, workspaceId } = props;

  const [loading, setLoading] = useState(false);
  const { mutateCollections } = useCollections(workspaceId);

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = async ({ title, description }: typeof form.values) => {
    setLoading(true);

    const response = await fetch(`/api/workspaces/${workspaceId}/collections`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    const { error } = await response.json();

    if (!response.ok) {
      showError(error.message);
    } else {
      setOpened(false);
      form.reset();
      mutateCollections();
      showSuccess("Collection created successfully");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create Collection"
    >
      <form method="POST" onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Add a title"
            {...form.getInputProps("title")}
          />
          <Textarea
            withAsterisk
            label="Description"
            placeholder="Short description of the collection"
            {...form.getInputProps("description")}
          />
          <Group position="right">
            <Button
              type="submit"
              disabled={!form.isValid()}
              loading={loading}
              color="cyan"
            >
              Create Collection
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  workspaceId: string;
};

export default CreateCollection;
