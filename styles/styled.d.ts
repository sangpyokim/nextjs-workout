import 'styled-components'
import { deviceProps } from './theme'

interface IBreakPointProps {
  mobile: string
  tablet: string
  laptop: string
}
interface IColors {
  black: string
  white: string
  blue: string
  yellow: string
  orange: string
  gray: string
  gray_white: string
  gray_background: string
  red: string
}
interface IFontSize {
  font_xs: string
  font_sm: string
  font_base: string
  font_lg: string
  font_xl: string
  font_xxl: string
}
interface INeumorphism {
  background_color: string
  box_shadow: string
  hover: {
    box_shadow: string
  }
  active: {
    box_shadow: string
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    breakPoint: IBreakPointProps
    colors: IColors
    fontSize: IFontSize
    lineHeight: IFontSize
    neumorphism: INeumorphism
  }
}
