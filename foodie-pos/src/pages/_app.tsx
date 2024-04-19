import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
