import * as Yup from "yup";
import { useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { PasswordInput, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Panel from "@components/core/Panel";

const schema = Yup.object().shape({
  password: Yup.string()
    .required("Enter your new password")
    .min(8, "Password must be at least 8 characters"),
});

const UpdatePassword = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      password: "",
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
        message: "Your password was updated successfully.",
      });
    }
  };

  return (
    <Panel
      title="Change Your Password"
      description="Enter your new password below."
    >
      <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          placeholder="Your new password"
          {...form.getInputProps("password")}
        />
        <div className="flex justify-end">
          <Button type="submit" color="cyan" loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default UpdatePassword;
