import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { NotificationsProvider } from "@mantine/notifications";

import "../styles/globals.css";

const myCache = createEmotionCache({ key: "mantine" });

export default function App(props: AppPropsWithLayout) {
  const [supabaseClient] = React.useState(() => createBrowserSupabaseClient());

  const { Component, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>HelpUp</title>
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          emotionCache={myCache}
          theme={{
            colorScheme: "light",
          }}
        >
          <NotificationsProvider
            position="top-center"
            zIndex={2077}
            autoClose={10000}
          >
            {getLayout(<Component {...pageProps} />)}
          </NotificationsProvider>
        </MantineProvider>
      </SessionContextProvider>
    </>
  );
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
