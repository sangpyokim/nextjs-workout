import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { themeProperties } from '../styles/theme'

interface IProps {
  styleTags: Array<React.ReactElement<{}>>
}

const COLOR_MODE_KEY = 'color-mode'
const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode'

function setColorsByTheme() {
  const modeProperties = '[modeProperties]'
  const colorModeKey = '[colorModeKey]'
  const colorModeCssProp = '[colorModeCssProp]'

  // 사용자 선호도 파악
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkFromMq = mql.matches

  // 로컬 스토리지에 저장된 테마값
  const persistedPreference = localStorage.getItem(colorModeKey)

  let colorMode = 'dark' // 컬러모드 기본값은 다크

  // const hasUsedToggle = typeof persistedPreference === 'string' // 로컬스토리지에 저장된 테마값이 있는지 여부를 저장

  // if (hasUsedToggle) {
  //   colorMode = persistedPreference // 저장했으면 로컬스토리지값 대로 컬러모드 지정
  // } else {
  //   colorMode = prefersDarkFromMq ? 'dark' : 'light' // 아니라면 선호도에 따라 컬러모드 지정
  // }

  const root = document.documentElement

  // 스타일 태그 속성에 현재 컬러모드 값을 기록
  root.style.setProperty(colorModeCssProp, colorMode)

  // theme 속성값을 기반으로 css 변수를 만들어내기
  // 예를 들어
  //  "card-background": {
  //  		light: themeColors.primary.light,
  //  		dark: themeColors.secondary.dark,
  //   },
  // 라는 테마값은 var(--card-background)로 변화함
  Object.entries(modeProperties).forEach(([name, colorByTheme]) => {
    const cssVarName = `--${name}`
    // @ts-ignore
    root.style.setProperty(cssVarName, colorByTheme[colorMode])
  })
}

const ScriptTag = () => {
  const stringifyFn = String(setColorsByTheme)
    // eslint-disable-next-line quotes
    .replace('"[modeProperties]"', JSON.stringify(themeProperties)) // JSON은 문자열로 변환시 쌍따옴표가 생겨서 추가적으로 쌍따옴표를 붙여서 처리해야 함.
    .replace('[colorModeKey]', COLOR_MODE_KEY)
    .replace('[colorModeCssProp]', INITIAL_COLOR_MODE_CSS_PROP)

  const fnToRunOnClient = `(${stringifyFn})()`

  return <script dangerouslySetInnerHTML={{ __html: fnToRunOnClient }} />
}

export default class MyDocument extends Document<IProps> {
  static async getInitialProps(context: any) {
    const sheet = new ServerStyleSheet() // Create an instance of ServerStyleSheet
    const originalRenderPage = context.renderPage
    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(context)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="manifest"
            href="/manifest.json"
          />
          <link
            href="assets/favicons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="assets/favicons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link
            rel="apple-touch-icon"
            href="assets/icons/icon-192x192.png"
          />
          <meta
            name="msapplication-TileColor"
            content="#000000"
          />
          <meta
            name="theme-color"
            content="#000000"
          />

          <link
            href="assets/splashscreens/iphone5_splash.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="assets/splashscreens/iphone6_splash.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="assets/splashscreens/iphoneplus_splash.png"
            media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="assets/splashscreens/iphonex_splash.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="assets/splashscreens/iphonexr_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="assets/splashscreens/iphonexsmax_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="assets/splashscreens/ipad_splash.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="assets/splashscreens/ipadpro1_splash.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="assets/splashscreens/ipadpro3_splash.png"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="assets/splashscreens/ipadpro2_splash.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />

          {/* Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          <ScriptTag />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
