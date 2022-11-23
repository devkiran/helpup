import { Button } from "@mantine/core";
import type { Provider } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// Add more providers here as needed and enable them in Supabase
const providers: {
  title: string;
  provider: Provider;
}[] = [
  {
    title: "Continue with GitHub",
    provider: "github",
  },
];

const AuthProviders = () => {
  const supabase = useSupabaseClient();

  const signInWithProvider = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
    });
  };

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <div key={provider.title}>
          <Button
            type="submit"
            fullWidth
            variant="outline"
            color="cyan"
            onClick={() => {
              signInWithProvider(provider.provider);
            }}
          >
            {provider.title}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AuthProviders;
