import Header from './Header'
import styled from 'styled-components'
import TempNav from './TempNav'
import { LayoutProps } from '../../interface'
import { useAuthInit } from './hooks/useAuthInit'
import useLocalStorageInit from './hooks/useLocalStorageInit'

const Container = styled.div`
  /* width: 100%; */
  background-color: ${(props) => props.theme.colors.black};
`

const Layout = ({ children }: LayoutProps) => {
  useAuthInit()
  useLocalStorageInit()

  return (
    <Container>
      <Header />

      <TempNav />

      {children}
    </Container>
  )
}

export default Layout
