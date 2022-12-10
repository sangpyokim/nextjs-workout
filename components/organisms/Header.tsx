import { Auth, onAuthStateChanged } from 'firebase/auth'
import React, { ReactElement, useEffect, useState } from 'react'
import { getMyAuth } from '../../utils/firebase/Auth'
import GoogleLogInButton from '../atoms/GoogleLogInButton'
import LogInButton from '../atoms/LogInButton'
import Logo from '../atoms/Logo'
import HeaderLogIn from '../molecules/HeaderLogIn'
import styles from './Header.module.css'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { authLoading, userInfo } from '../../utils/recoil/ExercisesState'

type HeaderProps = {}

const Header = ({}: HeaderProps) => {
  const [user, setUser] = useRecoilState(userInfo)
  const [loading, setLoading] = useRecoilState(authLoading)

  return (
    <header className={styles.container}>
      <Logo />

      {loading ? null : <HeaderLogIn user={user.displayName} />}
    </header>
  )
}

export default Header
