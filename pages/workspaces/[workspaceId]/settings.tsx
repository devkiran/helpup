import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ColorInput, Button, Stack, TextInput } from "@mantine/core";

import Panel from "@components/core/Panel";
import useWorkspace from "@lib/hooks/useWorkspace";
import { showError, showSuccess } from "@lib/client/notification";
import AppShellLayout from "@components/layouts/AppShellLayout";

const Settings = () => {
  const router = useRouter();

  const { workspaceId } = router.query as { workspaceId: string };

  const [loading, setLoading] = useState(false);
  const { workspace, isLoading } = useWorkspace(workspaceId);

  const form = useForm({
    initialValues: {
      siteName: "",
      heading: "",
      headerColor: "",
    },
  });

  useEffect(() => {
    if (workspace) {
      form.setValues({
        siteName: workspace?.siteName,
        heading: workspace?.heading,
        headerColor: workspace?.headerColor,
      });
    }
  }, [workspace]);

  if (isLoading || !workspace) {
    return null;
  }

  const handleSubmit = async ({
    siteName,
    heading,
    headerColor,
  }: typeof form.values) => {
    setLoading(true);

    const response = await fetch(`/api/workspaces/${workspaceId}`, {
      method: "PUT",
      body: JSON.stringify({ siteName, heading, headerColor }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    const { error } = await response.json();

    if (!response.ok) {
      showError(error.message);
    } else {
      showSuccess("Workspace settings updated");
    }
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            <Panel
              title="Customize the Help Center"
              description="Customize the look and feel of your Help Center."
            >
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                  <TextInput
                    withAsterisk
                    label="Site name"
                    placeholder="HelpUp"
                    {...form.getInputProps("siteName")}
                    required
                  />
                  <TextInput
                    withAsterisk
                    label="Heading"
                    placeholder="Advice and answers from the HelpUp"
                    {...form.getInputProps("heading")}
                    required
                  />
                  <ColorInput
                    withAsterisk
                    disallowInput
                    placeholder="Pick color"
                    label="Header color"
                    required
                    format="rgb"
                    {...form.getInputProps("headerColor")}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" color="cyan" loading={loading}>
                      Save Changes
                    </Button>
                  </div>
                </Stack>
              </form>
            </Panel>
          </div>
        </div>
      </div>
    </main>
  );
};

Settings.getLayout = function getLayout(page: React.ReactNode) {
  return <AppShellLayout>{page}</AppShellLayout>;
};

export default Settings;
