import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import { setScreenSize } from '../../utils/window/screen'
type NestedLayoutProps = {
  children: ReactElement
}

const Container = styled.div`
  /* @media ${({ theme }) => theme.breakPoint.tablet} {
    max-width: 640px;
    margin: 0 auto 0;
    padding-top: 55px;
  } */

  max-width: 1060px;
  box-sizing: border-box;
  margin: 0 auto 0;

  padding: 20px;
  background-color: transparent;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: var(--border-color);

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
