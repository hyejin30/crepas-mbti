import { css } from "@emotion/react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      css={css`
        min-height: 100vh;
        min-width: 375px;
        max-width: var(--max-width);
        margin: 0 auto;
        overflow: auto;

        & > * {
          width: 100%;
          height: 100vh;
        }
      `}
    >
      {children}
    </div>
  );
};
