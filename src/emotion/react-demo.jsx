import React from 'react';
import { css, jsx, Global, ClassNames } from '@emotion/react'
import styled from '@emotion/styled';

const mystyle = css`
  label: foobar;
  content: overridden;
  color: green;
`;

const fnClass = (mb) => css`margin-bottom: ${mb};`;

const Box = ({ as='div', css:cssArg=[], children, ...rest }={}) => {
  return jsx(as, {
    css: [css`content: generated;color: green;`].concat(cssArg),
    ...rest
  }, children);
}


export const Test = () => (
  <div css={{ color: 'hotpink', marginLeft: '2rem' }}>
    <Box as='p' css={[css`content: other; background: blue;`, mystyle]}/>
    <p css={[{
      '@media (min-width: 50em)': {
        color: 'blue',
      }
    },{
      '@media (min-width: 20em)': {
        color: 'red',
      }
    }]}>hello world</p>
    <p css={[{
      '@media (min-width: 50em)': {
        color: 'blue',
      }
    }]}>another thing</p>
    <div
      css={css`
        color: green;
      `}
    />
    <Global
      styles={{
        body: {
          margin: 0,
          padding: 0
        }
      }}
    />
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            'some-class',
            css`
              color: yellow;
            `,
          )}
        />
      )}
    </ClassNames>
  </div>
)
