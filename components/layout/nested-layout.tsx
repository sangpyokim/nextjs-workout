import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import { setScreenSize } from '../../utils/window/screen'
import styles from './nested-layout.module.css'
type NestedLayoutProps = {
  children: ReactElement
}

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.tablet} {
    max-width: 640px;
    margin: 0 auto 0;
    padding-top: 55px;
  }

  max-width: 840px;
  box-sizing: border-box;
  margin: 0 auto 0;
  padding-top: 55px;
  background-color: #f4f4f4;
  min-height: calc(var(--vh, 1vh) * 100);
`

const NestedLayout = ({ children }: NestedLayoutProps) => {
  useEffect(() => {
    setScreenSize()
    window.addEventListener('resize', setScreenSize)

    return () => window.removeEventListener('resize', setScreenSize)
  }, [])
  return <Container>{children}</Container>
}

export default NestedLayout
