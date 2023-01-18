import React from 'react'
import Logo from '../atoms/Logo'
import HeaderLogIn from '../molecules/HeaderLogIn'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { authLoading, userInfo } from '../../recoil/ExercisesState'
import styled from 'styled-components'

type HeaderProps = {}

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid #d2d2d2;
  position: fixed;
  z-index: 10;
  height: 45px;
  width: 100%;
  padding: 0 16px;
  margin: 0 auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Header = ({}: HeaderProps) => {
  const [user, setUser] = useRecoilState(userInfo)
  const [loading, setLoading] = useRecoilState(authLoading)

  return (
    <Container>
      <Logo />

      {loading ? null : <HeaderLogIn user={user.displayName} />}
    </Container>
  )
}

export default Header
