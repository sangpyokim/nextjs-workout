import { DefaultTheme } from 'styled-components'

const deviceSizes = {
  mobile: '768px',
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

  colors: {
    black: '#252525',
    yellow: '#edb83c',
    orange: '#eb7952',
    gray: '#6e6e6e',
    gray_background: '#f5f5f5',
  },

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
