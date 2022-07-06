const theme = {
  // must be unitless pixel numbers
  breakpoints: {
    sm: 320,
    md: 640,
    lg: 960,
  },
  spaces: ['2rem'],
};

type Theme = typeof theme;
type Breakpoints = Theme['breakpoints'];
type BpKey = keyof Breakpoints;
type BpArg = BpKey | [BpKey] | [BpKey | null, BpKey | null];

export function makeQueryString(bp: BpArg, breakpoints: Breakpoints) {
  const [loBp, hiBp] = Array.isArray(bp) ? bp : [bp];
  const loValue = loBp && breakpoints[loBp];
  const hiValue = hiBp && breakpoints[hiBp];
  const loQuery = loValue ? ` and (min-width: ${loValue / 16}em)` : '';
  const hiQuery = hiValue ? ` and (max-width: ${(hiValue - 0.01) / 16}em)` : '';
  return loQuery || hiQuery ? `@media screen${loQuery}${hiQuery}` : '';
}

export function minWidthQueryString(bp: BpKey, breakpoints: Breakpoints) {
  const pxValue = bp && breakpoints[bp];
  const minWidthQuery = pxValue ? ` and (min-width: ${pxValue / 16}em)` : '';
  return minWidthQuery ? `@media screen${minWidthQuery}` : '';
}

export const media = (bp: BpArg, body: string) => ({
  theme: { breakpoints },
}: {
  theme: Theme;
}) => {
  const queryString = makeQueryString(bp, breakpoints);
  return queryString
    ? [`${queryString} {`, body, `}`]
    : bp in breakpoints || bp === '_'
    ? body
    : '';
};

// function bpValue(bpObj) {
//   return function ({ theme }) {
//     return Object.entries(bpObj).map(([propKey, propObj]) => {
//       return Object.entries(propObj).map(([bp, value]) => {
//         return media(bp, `--${propKey}: ${value}`)({ theme });
//       });
//     });
//   };
// }

// bpValue({
//   px: { lg: 20 },
//   mt: { md: 20 },
// })({ theme }); //?

function varify(varDefaults) {
  return function ({ theme, ...props }) {
    return Object.entries(varDefaults).map(([varKey, defaultValue]) => {
      return varKey in props
        ? // TODO: sort these entries, by breakpoints value lo to hi
          Object.entries({ _: defaultValue, ...props[varKey] }).map(
            ([bpKey, value]) => {
              return media(bpKey, `--${varKey}: ${value};`)({ theme });
            }
          )
        : [];
    });
  };
}

varify({
  px: 10,
  mt: 10,
})({
  px: { lg: 20, foo: 30 },
  mt: { md: 20 },
  theme,
}); //?
