import { DefaultTheme } from 'styled-components'

const fontSize = {
  font_xs: '0.75rem',
}
const lintHeight = {}

const colors = {
  black: '#000',
  white: '#ffffff',
  blue: '#85a5ff',
  yellow: '#ffd591',
  orange: '#eb7952',
  gray: '#303030',
  gray_white: '#626262',
  gray_background: '#f5f5f5',
  red: '#f5222d',
}
const deviceSizes = {
  mobile: '767px',
  tablet: '1264px',
  laptop: `1265px`,
}
const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (min-width: ${deviceSizes.mobile}) and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (min-width: ${deviceSizes.laptop})`,
}

export const theme: DefaultTheme = {
  breakPoint: device,
  colors: colors,
  fontSize: fontSize,
  neumorphism: {
    box_shadow: `-6px -6px 14px rgba(255, 255, 255, 0.7),
    6px 6px 10px rgba(0, 0, 0, 0.15)`,
    background_color: '#eee',
    hover: {
      box_shadow: `-2px -2px 6px rgba(255, 255, 255, 0.7),
      2px 2px 4px rgba(0, 0, 0, 0.15)`,
    },
    active: {
      box_shadow: `inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset 2px 2px 4px rgba(0, 0, 0, 0.1)`,
    },
  },
}
const lightTheme = {
  mode: '#fff',
  text: '#fff',
  background: '#fff',
  borderColor: '#fff',
  bodyColor: '#fff',
}
const darkTheme = {
  mode: '#fff',
  text: '#fff',
  background: '#fff',
  borderColor: '#fff',
  bodyColor: '#fff',
}
export const themeProperties = {
  'mode-color': {
    light: lightTheme.mode,
    dark: darkTheme.mode,
  },
  'text-color': {
    light: lightTheme.text,
    dark: darkTheme.text,
  },
  'background-color': {
    light: lightTheme.background,
    dark: darkTheme.background,
  },
  'border-color': {
    light: lightTheme.borderColor,
    dark: darkTheme.borderColor,
  },
  'body-color': {
    light: lightTheme.bodyColor,
    dark: darkTheme.bodyColor,
  },
}
