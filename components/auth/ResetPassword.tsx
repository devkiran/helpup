import { PasswordInput, Text, Button, Title, Paper } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const schema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = async ({ password }: typeof form.values) => {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    form.reset();

    if (error) {
      showNotification({
        message: error.message,
        color: "red",
      });
    } else {
      showNotification({
        message: "Your password has been updated successfully.",
      });

      router.push("/dashboard");
    }
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
                <PasswordInput
                  withAsterisk
                  label="New Password"
                  placeholder="********"
                  {...form.getInputProps("password")}
                />
                <PasswordInput
                  withAsterisk
                  label="Confirm New Password"
                  placeholder="********"
                  {...form.getInputProps("confirmPassword")}
                />
                <Button type="submit" fullWidth loading={loading} color="cyan">
                  Reset Password
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

export default ResetPassword;
