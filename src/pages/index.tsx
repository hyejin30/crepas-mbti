import { Button } from "@/components/Button";
import { css, useTheme } from "@emotion/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <h1
        css={css`
          position: relative;
          font-size: var(--font-title);
          margin-bottom: 30px;

          &:after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 30%;
            background: ${theme.color.pink};
            opacity: 0.5;
            z-index: -1;
          }
        `}
      >
        크레파스 MBTI
      </h1>
      <p
        css={css`
          font-size: 24px;
          margin-bottom: 20px;
        `}
      >
        클파에서 나는 어떤 유형일까?
      </p>
      <div
        css={css`
          position: relative;
          width: 80%;
          aspect-ratio: 2/1;
          margin-bottom: 30px;
          text-align: center;
        `}
      >
        <Image alt="cats" src="/images/main-image.jpg" fill />
      </div>
      <Button
        css={css`
          box-shadow: 0.2rem 0.3rem 0 ${theme.color.black};
        `}
        onClick={() => router.push("/qna")}
      >
        테스트 시작 !
      </Button>
    </div>
  );
}
