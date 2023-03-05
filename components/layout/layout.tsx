import Header from './Header'
import styled from 'styled-components'
import TempNav from './TempNav'
import { LayoutProps } from '../../interface'
import { useAuthInit } from './hooks/useAuthInit'

const Container = styled.div`
  /* width: 100%; */
  background-color: ${(props) => props.theme.colors.black};
`

const Layout = ({ children }: LayoutProps) => {
  useAuthInit()

  return (
    <Container>
      <Header />

      <TempNav />

      {children}
    </Container>
  )
}

export default Layout
