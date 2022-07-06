import React from "react";
import styled, {
  css,
  createGlobalStyle,
  ThemeProvider,
} from "styled-components";

const otherStyle = css`
  color: red;
  ${(p) => console.log(Object.keys(p))}
`;
const TestDiv = styled('p')(otherStyle);

const theme = {
  breakpoints: {
    sm: 320,
    md: 640,
    lg: 960,
  },
  spaces: ["2rem"],
};

console.log({otherStyle});

export default () => (
  <ThemeProvider theme={theme}>
    <div
      css={`
        color: blue;
      `}
    >
      hello world
    </div>
    <TestDiv foo="foo" />
  </ThemeProvider>
);
