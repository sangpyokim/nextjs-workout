import 'styled-components'
import { deviceProps } from './theme'

interface breakPointProps {
  mobile: string
  tablet: string
  laptop: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    breakPoint: breakPointProps

    colors: {
      black: string
      white: string
      blue: string
      yellow: string
      orange: string
      gray: string
      gray_background: string
      red: string
    }

    neumorphism: {
      background_color: string
      box_shadow: string
      hover: {
        box_shadow: string
      }
      active: {
        box_shadow: string
      }
    }
  }
}
