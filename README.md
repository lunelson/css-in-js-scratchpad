# css-in-js-scratchpad

CLI scripts for inspecting the output from popular CSS-in-JS libs. Supported so far:

- [emotion (v11.0.0-next, unreleased)](https://deploy-preview-1600--emotion.netlify.app/)
- [linaria (v2.0.0-alpha, unreleased—partial support only)](https://github.com/callstack/linaria)
- [styled-components (v5.1.x)](https://styled-components.com/docs/)

(To properly support linaria, and to support astroturf, may require using webpack JS API).

## Instructions

1. Each source file must import `React` and whatever CSS-in-JS library functions they are using, and export a React component called `Test`, as a named export.
2. These source files must be placed in their respective library-subfolder under `src`.

Open a terminal and run the appropriate script for your source file:

```sh
# for files under src/emotion/
yarn emotion source-filename.jsx

# for files under src/styled-components/
yarn styled-components source-filename.jsx

# for files under src/linaria/
yarn linaria source-filename.jsx
```

Check the existing source files for examples 😉.

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

Astroturf
https://github.com/4Catalyzer/astroturf
