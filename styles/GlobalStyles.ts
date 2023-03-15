import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  :focus {
    outline: none;
    border: none;
  }
  /* ::-webkit-scrollbar {
    display: none;
  } */


  
  html{
    -webkit-text-size-adjust: none;
    font-display: fallback;
    -ms-overflow-style: none;
    scrollbar-width: none;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

    @media ${({ theme }) => theme.breakPoint.mobile} {
      font-size: 14px;
    }
    @media ${({ theme }) => theme.breakPoint.tablet} {
      font-size: 16px;
    }
  }
  
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    
    background-color: var(--background-color);
    color: var(--text-color);
    border-color: var(--border-color);

    /* 스크롤바 ui 없애기 */
    ::-webkit-scrollbar {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      display: none;
      width: 0;  /* Remove scrollbar space */
      height: 0;
      background: black;  /* Optional: just make scrollbar invisible */
      -webkit-appearance: none;
    } 


    /* 드래그 제거 */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* 아이폰 터치 하이라이트 제거 */
    -webkit-tap-highlight-color: transparent;

    /* min-height: calc(var(--vh, 1vh)); */
  }
  textarea {
    resize: none;
  }

  button {
    :hover {
      background-color: var(--color-btn-bg-hover);
      border-color: var(--color-btn-border-hover);
    }
  }
  input {
    background-color: var(--input-bg);
    color: var(--text-color);
    border: 1px solid;
    border-color: var(--border-color);
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
