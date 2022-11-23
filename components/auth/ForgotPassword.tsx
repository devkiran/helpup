import { TextInput, Text, Button, Title, Paper } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
});

const ForgotPassword = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = async ({ email }: typeof form.values) => {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    setLoading(false);

    if (error) {
      showNotification({
        message: error.message,
        color: "red",
      });
    } else {
      showNotification({
        message:
          "You will receive an email with a link to reset your password if it exists in our system.",
      });
    }

    form.reset();
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className="flex h-screen items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Paper shadow="xs" p="lg">
            <div className="space-y-6">
              <div className="space-y-3">
                <Title order={2} align="center">
                  Reset Password
                </Title>
                <Text size="md" align="center">
                  The quickest way to start using Tailwind CSS in your Next.js
                </Text>
              </div>
              <form
                className="space-y-3"
                method="POST"
                onSubmit={form.onSubmit(handleSubmit)}
              >
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="kiran@example.com"
                  {...form.getInputProps("email")}
                />
                <Button
                  type="submit"
                  fullWidth
                  disabled={!form.isValid()}
                  loading={loading}
                  color="cyan"
                >
                  Send Password Reset Email
                </Button>
              </form>
            </div>
          </Paper>
          <Text size="sm" align="center" className="mt-4">
            <Link href="/signin">Back to sign in</Link>
          </Text>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
