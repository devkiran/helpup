import {
  TextInput,
  PasswordInput,
  Text,
  Button,
  Title,
  Paper,
  Divider,
} from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { useForm, yupResolver } from "@mantine/form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import AuthProviders from "./AuthProviders";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = async ({ email, password }: typeof form.values) => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      showNotification({
        message: error.message,
        color: "red",
      });

      return;
    }

    if (data) {
      router.replace("/workspaces");
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="flex h-screen items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Paper shadow="xs" p="lg">
            <div className="space-y-6">
              <div className="space-y-3">
                <Title order={2} align="center">
                  Sign in to your account
                </Title>
              </div>
              <form
                className="space-y-3"
                method="POST"
                onSubmit={form.onSubmit(handleSubmit)}
              >
                <TextInput
                  withAsterisk
                  label="Email"
                  {...form.getInputProps("email")}
                  placeholder="kiran@example.com"
                />
                <PasswordInput
                  withAsterisk
                  label="Password"
                  {...form.getInputProps("password")}
                  placeholder="********"
                />
                <Button
                  type="submit"
                  fullWidth
                  disabled={!form.isValid()}
                  loading={loading}
                  color="cyan"
                >
                  Submit
                </Button>
              </form>
              <Divider
                my="sm"
                variant="dashed"
                label="OR"
                labelPosition="center"
              />
              <AuthProviders />
            </div>
          </Paper>
          <Text size="sm" align="center" className="mt-4">
            Don't have an account? <Link href="/signup">Sign up</Link>
          </Text>
          <Text size="sm" align="center" className="mt-2">
            Forgot password? <Link href="/forgot-password">Reset</Link>
          </Text>
        </div>
      </div>
    </>
  );
};

export default SignIn;
