# css-in-js-scratchpad

CLI scripts for inspecting the output from popular CSS-in-JS libs.

## Instructions

1. Place source files under their respective compiler subfolder in `src`.
2. Open a terminal and invoke the appropriate script:

```sh
# for files under src/emotion/
yarn emotion source-filename.jsx

# for files under src/styled-components/
yarn styled-components source-filename.jsx

# for files under src/linaria/
yarn linaria source-filename.jsx
```

## Reference Links

Emotion @next (11)
https://deploy-preview-1600--emotion.netlify.app/
https://github.com/emotion-js/emotion/pull/1600

- NB: Gatsby and Next.js implementation patterns
  https://deploy-preview-1600--emotion.netlify.app/docs/ssr
  https://github.com/emotion-js/emotion/blob/next/site/README.md
  https://github.com/vercel/next.js/blob/canary/examples/with-emotion-11/README.md

- NB: configure the packages correctly: https://deploy-preview-1600--emotion.netlify.app/docs/package-summary

Styled Components
https://styled-components.com/docs/advanced#server-side-rendering

Linaria
https://github.com/callstack/linaria
https://linaria.now.sh/
https://github.com/thymikee/linaria-jest/

Compiled CSS in JS
https://github.com/atlassian-labs/compiled-css-in-js
https://compiledcssinjs.com/

Astroturf
https://github.com/4Catalyzer/astroturf

JSS
https://codesandbox.io/s/z21lpmvv33
