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

const darkTheme = {
  headerBackground: '#2d333b',
  headerTextColor: 'rgba(205,217,229,0.7)',
  background: '#22272e',
  borderColor: 'rgba(205,217,229,0.1)',
  textColor: '#adbac7',
  textSubColor: '#768390cd',
  buttonBackgroundColor: '#373e47',
  toggleOn: '#316dca',
  toggleOff: '#293F65',
  toggleBackGroundOn: '#293F65',
  toggleBackGroundOff: '#1D2128',
  toggleBorderColor: '#565F6B',
  inputColor: '#768390',
  inputPlaceholderColor: '#636e7b',
  inputBackgroundColor: '#2d333b',
  buttonBGColorHover: '#444c56',
  buttonBorderColorHover: '#768390',
}
const lightTheme = {
  headerBackground: '#2d333b',
  headerTextColor: 'rgba(205,217,229,0.7)',
  background: '#22272e',
  borderColor: 'rgba(205,217,229,0.1)',
  textColor: '#adbac7',
  textSubColor: '#768390cd',
  buttonBackgroundColor: '#373e47',
  toggleOn: '#316dca',
  toggleOff: '#293F65',
  toggleBackGroundOn: '#293F65',
  toggleBackGroundOff: '#1D2128',
  toggleBorderColor: '#565F6B',
  inputColor: '#768390',
  inputPlaceholderColor: '#636e7b',
  inputBackgroundColor: '#2d333b',
  buttonBGColorHover: '#444c56',
  buttonBorderColorHover: '#768390',
}

// 모드 변경시 변경되는 색깔.
export const themeProperties = {
  'header-bg': {
    light: lightTheme.headerBackground,
    dark: darkTheme.headerBackground,
  },
  'header-text-color': {
    light: lightTheme.headerTextColor,
    dark: darkTheme.headerTextColor,
  },
  'text-color': {
    light: lightTheme.textColor,
    dark: darkTheme.textColor,
  },
  'background-color': {
    light: lightTheme.background,
    dark: darkTheme.background,
  },
  'border-color': {
    light: lightTheme.borderColor,
    dark: darkTheme.borderColor,
  },
  'text-sub-color': {
    light: lightTheme.textSubColor,
    dark: darkTheme.textSubColor,
  },
  'button-bg': {
    light: lightTheme.buttonBackgroundColor,
    dark: darkTheme.buttonBackgroundColor,
  },
  'toggle-on': {
    light: lightTheme.toggleOn,
    dark: darkTheme.toggleOn,
  },
  'toggle-off': {
    light: lightTheme.toggleOff,
    dark: darkTheme.toggleOff,
  },
  'toggle-bg-on': {
    light: lightTheme.toggleBackGroundOn,
    dark: darkTheme.toggleBackGroundOn,
  },
  'toggle-bg-off': {
    light: lightTheme.toggleBackGroundOff,
    dark: darkTheme.toggleBackGroundOff,
  },
  'toggle-border-color': {
    light: lightTheme.toggleBackGroundOff,
    dark: darkTheme.toggleBackGroundOff,
  },
  'input-color': {
    light: lightTheme.inputColor,
    dark: darkTheme.inputColor,
  },
  'input-placeholder-color': {
    light: lightTheme.inputPlaceholderColor,
    dark: darkTheme.inputPlaceholderColor,
  },
  'input-bg': {
    light: lightTheme.inputBackgroundColor,
    dark: darkTheme.inputBackgroundColor,
  },
  'color-btn-bg-hover': {
    light: lightTheme.buttonBGColorHover,
    dark: darkTheme.buttonBGColorHover,
  },
  'color-btn-border-hover': {
    light: lightTheme.buttonBorderColorHover,
    dark: darkTheme.buttonBorderColorHover,
  },
}
