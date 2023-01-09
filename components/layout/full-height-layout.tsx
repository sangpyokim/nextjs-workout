import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import { setScreenSize } from '../../utils/window/screen'
import styles from './full-height.module.css'

type FullHeightProps = {
  children: ReactElement
}

const Container = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  max-width: 470px;
  margin: 0 auto 0;
  background-color: white;
`

const FullHeightLayout = ({ children }: FullHeightProps) => {
  useEffect(() => {
    setScreenSize()
    window.addEventListener('resize', setScreenSize)

    return () => window.removeEventListener('resize', setScreenSize)
  }, [])

  return <Container>{children}</Container>
}

export default FullHeightLayout
