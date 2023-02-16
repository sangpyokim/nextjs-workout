import { ReactElement, useContext, useEffect, useState } from 'react'

import Head from 'next/head'

import Header from './Header'
import Navigator from '../organisms/Navigator'
import { getMyAuth } from '../../firebase/auth/Auth'
import { onAuthStateChanged } from 'firebase/auth'
import { authLoading, userInfo } from '../../recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import TempNav from '../organisms/TempNav'
import { useAuth } from './useAuth'
import { useAuthInit } from './useAuthInit'
import { setScreenSize } from '../../utils/window/screen'
import { ARemainTime } from '../../recoil/AllAtom'

type LayoutProps = {
  children: ReactElement
}

const Container = styled.div`
  /* width: 100%; */
  background-color: ${(props) => props.theme.colors.black};
`

const Layout = ({ children }: LayoutProps) => {
  useAuthInit()

  return (
    <Container
      onBlur={() => console.log('click')}
      onFocus={() => console.log(focus)}
    >
      <Header />
      {/* {activeNotification && (
        <Notification
          message={'123'}
          status={true}
          title={'title'}
        />
      )} */}

      {/* <Header /> */}
      <TempNav />

      {children}

      {/* <Navigator /> */}
    </Container>
  )
}

export default Layout
