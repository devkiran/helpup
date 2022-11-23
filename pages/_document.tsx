import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html className="h-full">
        <Head>
          <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
        </Head>
        <body className="h-full bg-gray-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
