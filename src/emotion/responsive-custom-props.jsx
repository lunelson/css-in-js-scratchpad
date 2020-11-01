import React from 'react';
import { css } from '@emotion/css';
import cn from 'classnames';

const Box = ({ as = 'div', mt, mb, span, rowSpan, children, ...restProps }) => {
  const classes = [
    // mt && ['mt', css`--mt: ${mt};`],
    // mb && ['mb', css`--mb: ${mb};`],
    span && ['span', css`--column-span: ${span};`],
    rowSpan && ['row-span', css`--row-pan: ${rowSpan};`],
  ].filter(Boolean)
  return React.createElement(as, { className: cn(...classes), ...restProps }, children)
}

export const Test = () => (
  <>
    <Box mb={30} span={2} rowSpan={2}></Box>
    <Box as='span' mb={30} mt={10}></Box>
  </>
)
