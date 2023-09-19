import { ApolloProvider } from "@apollo/client";
import { type AppProps } from "next/app";

import { Header } from "~/components";
import { apolloClient } from "~/lib/commercetools/graphql/client";

import "~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <ApolloProvider client={apolloClient}>
        <Header />
        <Component {...pageProps} />
      </ApolloProvider>
    </main>
  );
}
