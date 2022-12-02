import * as Yup from "yup";
import { useEffect, useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import Panel from "@components/core/Panel";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const UpdateName = () => {
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, []);

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: yupResolver(schema),
  });

  const fetchProfile = async () => {
    const { data } = await supabase.from("profiles").select("*").single();

    form.setValues({ name: data.name });
  };

  if (!user) {
    return null;
  }

  const handleSubmit = async ({ name }: typeof form.values) => {
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({ name })
      .eq("user_id", user.id);

    setLoading(false);

    if (error) {
      showNotification({
        message: error.message,
        color: "red",
      });
    } else {
      showNotification({
        message: "Your profile details were updated successfully.",
      });
    }
  };

  return (
    <Panel
      title="Your Profile"
      description="Please enter your full name, or a display name you are comfortable with."
    >
      <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder="Your name" {...form.getInputProps("name")} />
        <div className="flex justify-end">
          <Button type="submit" color="cyan" loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default UpdateName;
