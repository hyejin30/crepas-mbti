import { Interpolation, Theme, css, useTheme } from "@emotion/react";
import { HTMLAttributes } from "react";

export const Button = ({
  variant = "pink",
  children,
  ...props
}: {
  css?: Interpolation<Theme>;
  variant?: "pink" | "white";
} & HTMLAttributes<HTMLButtonElement>) => {
  const theme = useTheme();

  return (
    <button
      css={css`
        font-size: var(--font-large);
        padding: 16px 50px 20px;
        border-radius: 3rem;
        border: 0.25rem solid ${theme.color.black};

        ${variant === "pink" &&
        css`
          background: ${theme.color.pink};
          color: ${theme.color.white};
        `}

        ${variant === "white" &&
        css`
          border: 0.25rem solid ${theme.color.black};
          background: ${theme.color.white};
          color: ${theme.color.black};
        `}
      `}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
