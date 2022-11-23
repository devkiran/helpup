import * as Yup from "yup";
import { useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { Button, Modal, Group, TextInput } from "@mantine/core";

import useWorkspaces from "@lib/hooks/useWorkspaces";
import { showError, showSuccess } from "@lib/client/notification";

const CreateWorkspace = (props: Props) => {
  const { opened, setOpened } = props;

  const [loading, setLoading] = useState(false);
  const { mutateWorkspaces } = useWorkspaces();

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      name: "",
    },
  });

  const handleSubmit = async ({ name }: typeof form.values) => {
    setLoading(true);

    const response = await fetch("/api/workspaces", {
      method: "POST",
      body: JSON.stringify({ name }),
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
      mutateWorkspaces();
      showSuccess("Workspace created");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create workspace"
    >
      <form method="POST" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Workspace name"
          {...form.getInputProps("name")}
        />
        <Group position="right" mt="md">
          <Button
            type="submit"
            disabled={!form.isValid()}
            loading={loading}
            color="cyan"
          >
            Create Workspace
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

const schema = Yup.object().shape({
  name: Yup.string().required("Workspace name is required"),
});

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

export default CreateWorkspace;
