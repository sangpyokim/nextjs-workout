import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  :focus {
    outline: none;
    border: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  @font-face {
  font-family: 'timer-font';
  src: url('/fonts/BMEuljiro10yearslater.woff2') format('woff2');
  unicode-range: U+0030-0039, U+0041-005A, U+0061-007A;
  }
  
  html{
    -webkit-text-size-adjust: none;
    font-display: fallback;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: white;

    /* 드래그 제거 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* 아이폰 터치 하이라이트 제거 */
    -webkit-tap-highlight-color: transparent;
    /* min-height: calc(var(--vh, 1vh)); */
    }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  :root {
    --vh: 100%;
  }
`
