# css-in-js-scratchpad

CLI scripts for inspecting the output from popular CSS-in-JS libs. Supported so far:

- [emotion (v11.0.0-next, unreleased)](https://deploy-preview-1600--emotion.netlify.app/)
- [linaria (v2.0.0-alpha, unreleased—partial support only)](https://github.com/callstack/linaria)
- [styled-components (v5.1.x)](https://styled-components.com/docs/)

(To properly support linaria, and to support astroturf, may require using webpack JS API).

## Instructions

1. Each source file must (A) import `React`, as well as whatever CSS-in-JS library functions they are using, and (B) export a React component called `Test`, as a _named export_ (not default).
2. These source files must be placed in their CSS-in-JS library-respective subfolder under `src`.

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

Emotion 11 (next)
https://deploy-preview-1600--emotion.netlify.app/
https://github.com/emotion-js/emotion/pull/1600

Styled Components
https://styled-components.com/docs/advanced#server-side-rendering

Linaria
https://github.com/callstack/linaria
https://linaria.now.sh/

Astroturf
https://github.com/4Catalyzer/astroturf
