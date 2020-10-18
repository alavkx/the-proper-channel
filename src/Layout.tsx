import React from "react";
import { css } from "styled-components";

export const fullBleed = css`
  width: 100%;
  grid-column: 1 / -1;
  /* constrain the width for very-large monitors */
  max-width: 1500px;
  /* center the element */
  margin-left: auto;
  margin-right: auto;
`;
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => (
  <main
    css={`
      display: grid;
      grid-template-columns:
        1fr
        min(65ch, 100%)
        1fr;
      & > * {
        grid-column: 2;
      }
    `}
  >
    {children}
  </main>
);
