import * as Yup from "yup";
import { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import Panel from "@components/core/Panel";

const schema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

const UpdateEmail = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: user?.email,
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    const { error } = await supabase.auth.updateUser(values);

    setLoading(false);

    if (error) {
      showNotification({
        message: error.message,
        color: "red",
      });
    } else {
      showNotification({
        message:
          "A confirmation email has been sent to your new email address. Please check your inbox.",
      });
    }
  };

  return (
    <Panel
      title="Your Email"
      description="Please enter the email address you want to use to log in with HelpUp."
    >
      <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder="Your email" {...form.getInputProps("email")} />
        <div className="flex justify-end">
          <Button type="submit" color="cyan" loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default UpdateEmail;
