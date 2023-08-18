import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { RecoilRoot } from "recoil";

const bmjua = localFont({
  src: "./BMJUA.ttf",
  display: "swap",
  variable: "--bmjua-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>크레파스 MBTI</title>
        <meta name="description" content="크레파스에서 나의 성격 유형은?" />
        <meta key="og:image" property="og:image" content="/images/share.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <main className={bmjua.className}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
