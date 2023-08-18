import { css } from "@emotion/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>크레파스 MBTI</title>
        <meta name="description" content="크레파스에서 나의 성격 유형은?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid red;
        `}
      >
        <h1>크레파스 MBTI</h1>
      </div>
    </>
  );
}
