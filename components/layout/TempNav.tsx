import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { useAuth } from './hooks/useAuth'
import HeaderLogIn from './HeaderLogIn'
import Logo from '../atoms/Logo'
import RippleEffect from '../RippleEffect'

// width 1060px

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
            <RippleEffect duration={500}>
              <Route href={'/'}>홈</Route>
            </RippleEffect>

            <RippleEffect>
              <Route href={`/statistics/${user.email}`}>통계</Route>
            </RippleEffect>

            <RippleEffect>
              <Route href={`/group/${user.email}`}>그룹</Route>
            </RippleEffect>
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
  font-weight: 500;
  @media ${(props) => props.theme.breakPoint.mobile} {
    font-size: 1.8rem;
    font-weight: 600;
  }
`
const Route = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 50px;
  font-size: 1.2rem;
  font-weight: 500;

  @media ${(props) => props.theme.breakPoint.mobile} {
    display: none;
  }
`
