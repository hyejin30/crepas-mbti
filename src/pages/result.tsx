import { stepState, typeState } from "@/atoms/app";
import { Button } from "@/components/Button";
import { css, useTheme } from "@emotion/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import { useMemo } from "react";
import { useResetRecoilState } from "recoil";


const MBTI_LIST = [
  [
    {
      type: "S",
      desc: "peech",
      text: "스피치를 좋아하고",
    },
    {
      type: "P",
      desc: "pt",
      text: "PPT를 좋아하고",
    },
  ],
  [
    {
      type: "F",
      desc: "irst",
      text: "뒷풀이는 1차만 가는 걸 좋아하며",
    },
    {
      type: "N",
      desc: "night",
      text: "뒷풀이는 밤샘을 좋아하며",
    },
  ],
  [
    {
      type: "L",
      desc: "eader",
      text: "YB 운영진은 한 번쯤은 해보고 싶고",
    },
    {
      type: "M",
      desc: "ember",
      text: "회원으로 남는 걸 좋아하고",
    },
  ],
  [
    {
      type: "C",
      desc: "olorpul",
      text: "나 밖에 없으면 컬러풀도 하는 유형입니다!",
    },
    {
      type: "R",
      desc: "un",
      text: "컬러풀 권유를 받으면 도망가는 유형입니다!",
    },
  ],
];

export default function ResultPage() {
  const theme = useTheme();
  const router = useRouter();
  const type = router.query.type;

  const typeDesc = useMemo(() => {
    return MBTI_LIST.reduce((acc, currentType, i) => {
      if (typeof type === 'string') {
        const item = currentType.find((el) => el.type === type[i]);
        if (item) {
          acc.push({ type: item.type, desc: item.desc, text: item.text });
        }
      }
      return acc;
    }, []);
  }, [type]);

  const resetStep = useResetRecoilState(stepState);
  const resetType = useResetRecoilState(typeState);

  const reset = () => {
    resetStep();
    resetType();
  };

  return (
    <>
      <Head>
        <title>{`나의 클BTI - ${type}`}</title>
        <meta name="description" content="크레파스에서 나의 성격 유형은?" />
      </Head>
      <Script
        id="kakao"
        strategy="afterInteractive"
        src="https://developers.kakao.com/sdk/js/kakao.js"
        dangerouslySetInnerHTML={{
          __html: `
          Kakao.init('266d7b479a9fc8fe530be74837ecff19');
          
          document.getElementById('kakao-share-button').addEventListener('click', function() {
            Kakao.Link.sendDefault({
              objectType: 'feed',
              content: {
                title: ${`나의 클BTI - ${type}`},
                description: 크레파스에서 나의 성격 유형은?,
                imageUrl: /images/share.jpg,
                link: {
                  mobileWebUrl: ${typeof window !== 'undefined' ? window.location.href : ""},
                  webUrl: ${typeof window !== 'undefined' ? window.location.href : ""},
                }
              }
            });
          });
          
          `,
        }}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 30px 0px;
        `}
      >
        <Link
          css={css`
            width: 100%;
            position: absolute;
            top: 0;
            padding: 20px 0;
            background: ${theme.color.pink};
            font-size: var(--font-medium);
            color: ${theme.color.white};
            text-align: center;
          `}
          href="/"
          onClick={reset}
        >
          크레파스 MBTI
        </Link>
        <header
          css={css`
            display: flex;
            flex-direction: column;
            height: 100%;
            margin: 60px 0 50px;
          `}
        >
          <div
            css={css`
              line-height: 1.5;
              text-align: center;
              margin-bottom: 30px;
            `}
          >
            <div
              css={css`
                font-size: var(--font-large);
                color: ${theme.color.black};
              `}
            >
              나의 클BTI는...
            </div>
            <div
              css={css`
                font-size: 60px;
                color: ${theme.color.pink};
              `}
            >
              {type}
            </div>
          </div>
          <section
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
              gap: 50px;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 25px;
                width: 100%;
                padding: 30px;
                box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
              `}
            >
              {typeDesc.map((item, i) => (
                <div
                  key={`type-${i}`}
                  css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                  `}
                >
                  <div
                    css={css`
                      font-size: var(--font-large);
                    `}
                  >
                    <span
                      css={css`
                        color: ${theme.color.pink};
                      `}
                    >
                      {item.type}
                    </span>
                    <span>{item.desc}</span>
                  </div>
                  <div
                    css={css`
                      font-size: 18px;
                      word-break: keep-all;
                    `}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            <Button id="kakao-share-button">결과 공유하기</Button>
          </section>
        </header>
      </div>
    </>
  );
}
