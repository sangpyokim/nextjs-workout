import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import Logo from '../atoms/Logo'
import { useAuth } from '../layout/useAuth'
import HeaderLogIn from '../molecules/HeaderLogIn'

// width 1060px
const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid white;

  overflow: hidden; // 임시.
`
const Container = styled.div`
  max-width: 1060px;

  padding: 0 8px;
  height: 50px;
  margin: 0 auto 0;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.black};

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Menu = styled.div`
  display: flex;
  height: 100%;
  width: 200px;
`
const Routes = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
const Route = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 50px;
`

const TempNav = () => {
  const {
    open,
    modalClose,
    loading: verifying,
    user,
    signOut,
    logIn,
    authState,
  } = useAuth()
  return (
    <Wrapper>
      <Container>
        <Menu>
          <Logo />
          <Routes>
            <Route href={'/'}>홈</Route>
            <Route href={`/statistics/${user.email}`}>통계</Route>
            {/* <Route href={'/'}>경로3</Route> */}
          </Routes>
        </Menu>
        <HeaderLogIn
          open={open}
          setOpen={modalClose}
          user={user.displayName}
          verifying={verifying}
          signOut={signOut}
          logIn={logIn}
          authState={authState}
        />
      </Container>
    </Wrapper>
  )
}

export default TempNav
