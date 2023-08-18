import { stepState, typeState } from "@/atoms/app";
import { Button } from "@/components/Button";
import { css, useTheme } from "@emotion/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const LIMIT = 4;

const QNA_LIST = [
  {
    question: "클파를 했던 당시로 돌아가보자!\n 내가 더 좋아했던 역할은?",
    answers: ["스피치", "피피티"],
    type: ["S", "P"],
  },
  {
    question: "신나는 클파 뒷풀이!\n나의 뒷풀이 스타일은?",
    answers: ["예의상 1차만 간다", "무조건 밤샘이지"],
    type: ["F", "N"],
  },
  {
    question: "만약, 지금 내가 YB인데\n클파 운영진 권유를 받았다면?",
    answers: ["한 번쯤은 해본다", "회원으로 남는게 좋다"],
    type: ["L", "M"],
  },
  {
    question: "컬러풀 운영진 할 사람이\n나 밖에 없다며 부탁한다면?",
    answers: ["나 밖에 없다면 한다", "(벌써 도망가고 없다)"],
    type: ["C", "R"],
  },
];

export default function QnaPage() {
  const theme = useTheme();
  const router = useRouter();

  const [step, setStep] = useRecoilState(stepState);
  const [type, setType] = useRecoilState(typeState);

  useEffect(() => {
    if (type.length === LIMIT) {
      router.push(`/result?type=${type}`);
    }
  }, [type, router]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 30px 0px;
      `}
    >
      <header
        css={css`
          width: 100%;
          position: relative;
          font-size: var(--font-medium);
          color: ${theme.color.pink};
          margin-bottom: 15px;
        `}
      >
        <div>크레파스 MBTI</div>
        <div
          css={css`
            position: absolute;
            top: 0;
            right: 0;
            color: ${theme.color.pink};
          `}
        >
          {step + 1} / {LIMIT}
        </div>
      </header>
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 5px;
          background: ${theme.color.gray_e6};
          border-radius: 16px;

          &:after {
            position: absolute;
            top: 0;
            left: 0;
            content: "";
            width: ${((step + 1) / LIMIT) * 100}%;
            height: 5px;
            background: ${theme.color.pink};
            border-radius: 16px;
            z-index: 1;
          }
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
          margin: 50px 0;
        `}
      >
        <h2
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            font-size: var(--font-large);
            line-height: 1.5;
            white-space: pre-wrap;
            text-align: center;
            margin-bottom: 20px;
          `}
        >
          {QNA_LIST[step].question}
        </h2>
        <div
          css={css`
            position: relative;
            width: 100%;
            aspect-ratio: 1.5/1;
            margin-bottom: 30px;
          `}
        >
          <Image alt="cats" src="/images/main-image.jpg" fill />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 25px;
            width: 100%;
          `}
        >
          {QNA_LIST[step].answers.map((answer, index) => (
            <Button
              key={`qna-${index}`}
              variant="white"
              css={css`
                width: 100%;
              `}
              onClick={() => {
                if (step < LIMIT - 1) {
                  setStep((prev) => prev + 1);
                }

                setType((prev) => prev + QNA_LIST[step].type[index]);
              }}
            >
              {answer}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
