import React from 'react';
import styled, {
  css,
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components';

const MyBox = styled.div`
  color: red;
  height: 200px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    color: red;
  }
`;

const myStyle = css`
  margin-bottom: 16px;
`;

const gridBase = css`
  display: grid;
`;

function gridStyle(gap) {
  return [
    gridBase,
    css`
      grid-gap: ${gap};
    `,
  ];
}

export function queryString(query, breakpoints) {
  const [lo, hi] = [].concat(query);
  const loValue = lo && breakpoints[lo];
  const hiValue = hi && breakpoints[hi];
  const loQuery = loValue ? ` and (min-width: ${loValue}em)` : '';
  const hiQuery = hiValue ? ` and (max-width: ${hiValue - 0.01}em)` : '';
  return loQuery || hiQuery ? `@media screen${loQuery}${hiQuery}` : '';
}

export const media = (query, expr) => (props) => {
  const mediaQuery = queryString(query, props.theme.breakpoints);
  return [`${mediaQuery} {`, expr, `}`];
};

const StackBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > * {
    margin: 0;
    width: 100%;
  }
  & > * + * {
    margin-top: var(--mt);
    ${({ gap }) => `
    --mt: ${gap || '1rem'};
  `}
  }
`;
const Stack = styled(StackBase)`
  ${media(
    [null, 'sm'],
    css`
      color: green;
    `
  )}
  & > * + * {
    ${({ gap, theme }) => `
    --mt: ${theme.spaces[0]};
  `}
  }
`;

const Chain = styled.div`
  display: flex;
  & > * + * {
    margin-left: var(--ml);
    ${({ gap, theme }) => `
    --ml: ${theme.spaces[0]};
  `}
  }
`;

const theme = {
  breakpoints: {
    sm: 320,
    md: 640,
    lg: 960,
  },
  spaces: ['2rem'],
};

export default () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Stack>
      <div css={[...gridStyle('1rem')]}></div>
      <div css={[...gridStyle('2rem')]}></div>
    </Stack>
  </ThemeProvider>
);
