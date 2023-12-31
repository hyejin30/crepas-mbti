import { stepState, typeState } from "@/atoms/app";
import { Button } from "@/components/Button";
import { css, useTheme } from "@emotion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
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
      desc: "ight",
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
      if (typeof type === "string") {
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

  useEffect(() => {
    const Kakao = (window as any).Kakao;
    Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    Kakao.Link.createDefaultButton({
      container: "#kakao-share-button",
      objectType: "feed",
      content: {
        title: "클파 MBTI 테스트",
        description: "친구의 결과를 확인해보세요!",
        imageUrl: "/images/share.jpg",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "지금 확인하기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  }, []);

  return (
    <>
      <Head>
        <title>나의 클파 MBTI를 알아보자</title>
        <meta name="description" content="크레파스에서 나의 성격 유형은?" />
      </Head>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 30px 0px;
          overflow: auto;
        `}
      >
        <header
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
          `}
        >
          <div
            css={css`
              line-height: 1.5;
              text-align: center;
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
        </header>
        <section
          css={css`
            display: flex;
            flex-direction: column;
            height: 100%;
            gap: 45px;
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
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 10px;
              margin-bottom: 20px;
            `}
          >
            <Button id="kakao-share-button">결과 공유하기</Button>
            <Button
              onClick={() => {
                reset();
                router.push("/").then(router.reload);
              }}
            >
              처음으로 돌아가기
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
