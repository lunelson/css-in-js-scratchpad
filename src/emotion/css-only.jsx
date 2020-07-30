import React from 'react';
import { css, injectGlobal } from '@emotion/css';
import cn from 'classnames';

const mystyle = css`
  color: blue;
`;

const fnClass = (mb) => css`margin-bottom: ${mb};`;

injectGlobal`
.foo { cursor: pointer; }
.bar {
  height: stretch;
}
.example {
    display: grid;
    transition: all .5s;
    user-select: none;
    background: linear-gradient(to bottom, white, black);
}
`;

const Box = ({ as='div', className, children, ...rest }={}) => {
  return React.createElement(as, {
    className: cn(className, ...[
      'foo',
      'bar',
      css`@media (min-width: 30em) {
        color: green;
      }`
    ]),
    ...rest
  }, children);
};

export const Test = () => (
  <>
    <Box as="p" className={css`margin-right: 1em;`}/>
    <div className={cn(mystyle, fnClass('10px'))}>this is it</div>
  </>
)
