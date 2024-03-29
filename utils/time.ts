import { themeProperties } from '../styles/theme'

export const convertTimer = (num: number) => {
  const hours = Math.floor(num / 3600)
  const mins = Math.floor((num % 3600) / 60)
  const sec = Math.floor((num % 3600) % 60)
  const h = hours >= 10 ? hours : `0${hours}`
  const m = mins >= 10 ? mins : `0${mins}`
  const s = sec >= 10 ? sec : `0${sec}`
  return `${h}:${m}:${s}`
}

export function setColorsByTheme() {
  const modeProperties = '[modeProperties]'
  const colorModeKey = '[colorModeKey]'
  const colorModeCssProp = '[colorModeCssProp]'

  // 사용자 선호도 파악
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkFromMq = mql.matches

  // 로컬 스토리지에 저장된 테마값
  const persistedPreference = localStorage.getItem(colorModeKey)

  let colorMode = 'dark' // 컬러모드 기본값은 다크

  const hasUsedToggle = typeof persistedPreference === 'string' // 로컬스토리지에 저장된 테마값이 있는지 여부를 저장

  if (hasUsedToggle) {
    colorMode = persistedPreference // 저장했으면 로컬스토리지값 대로 컬러모드 지정
  } else {
    colorMode = prefersDarkFromMq ? 'dark' : 'light' // 아니라면 선호도에 따라 컬러모드 지정
  }

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
