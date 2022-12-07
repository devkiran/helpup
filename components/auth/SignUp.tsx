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
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import AuthProviders from "./AuthProviders";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const SignUp = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = async ({
    name,
    email,
    password,
  }: typeof form.values) => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
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
          "We have sent you an email with a confirmation link. Please click the link to confirm your email address.",
      });
    }

    form.reset();
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="flex h-screen items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Paper shadow="xs" p="lg">
            <div className="space-y-6">
              <div className="space-y-3">
                <Title order={2} align="center">
                  Get started in minutes
                </Title>
              </div>
              <form
                className="space-y-3"
                method="POST"
                onSubmit={form.onSubmit(handleSubmit)}
              >
                <TextInput
                  withAsterisk
                  label="Name"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  withAsterisk
                  label="Email"
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  withAsterisk
                  label="Password"
                  {...form.getInputProps("password")}
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
            Already have an account? <Link href="/signin">Sign in</Link>
          </Text>
        </div>
      </div>
    </>
  );
};

export default SignUp;
