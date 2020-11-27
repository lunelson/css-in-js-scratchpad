export const stylePropKeys = `

mt
mr
mb
ml
my
mx
pt
pr
pb
pl
py
px
gapY

`.trim().split('\n').filter(Boolean);

export function parseStyleProps(props) {
  const
    propKeys = Object.keys(props),
    classNames = [],
    styleRules = [],
    restProps = {};
  let n = propKeys.length,
    propKey = undefined;
  while (n--) {
    propKey = propKeys[n];
    if (~stylePropKeys.indexOf(propKey)) {
      let prop = props[propKey];
      prop = isBreakPointObj(prop) ? prop : { _: prop };
      for (const bk in prop) {
        classNames.push(responsiveClass(bk, propKey));
        styleRules.push(media(bk, `--${propKey}: ${parseStylePropValue(prop[bk])};`));
      }
    }
    else restProps[propKey] = props[propKey];
  }
  return [classNames.concat(css`${styleRules}`), restProps];
}

export function parseStylePropValue(value, key) {
  /*

  TODO: look up special value output rules here

  - css keyword value -> output
  - sys keyword value -> parse value and output
  - theme key -> look up and output

  */
  return stringifyValue(value);
}
