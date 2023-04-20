import Header from './Header'
import styled from 'styled-components'
import TempNav from './TempNav'
import { LayoutProps } from '../../interface'
import { useAuthInit } from './hooks/useAuthInit'
import useLocalStorageInit from './hooks/useLocalStorageInit'
import Notification from './Notification'

const Container = styled.div`
  /* width: 100%; */
`

const Layout = ({ children }: LayoutProps) => {
  useAuthInit()
  useLocalStorageInit()

  return (
    <Container>
      {/* html head */}
      <Header />

      <TempNav />

      <Notification />

      {children}
    </Container>
  )
}

export default Layout
