import { Auth, onAuthStateChanged } from 'firebase/auth'
import React, { ReactElement, useEffect, useState } from 'react'
import { getMyAuth } from '../../utils/firebase/Auth'
import GoogleLogInButton from '../atoms/GoogleLogInButton'
import LogInButton from '../atoms/LogInButton'
import Logo from '../atoms/Logo'
import HeaderLogIn from '../molecules/HeaderLogIn'
import styles from './Header.module.css'
import { useRecoilValueLoadable } from 'recoil'

type HeaderProps = {}

const Header = ({}: HeaderProps) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<string | null>('')

  const temp = getMyAuth()
  onAuthStateChanged(temp.auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid
      setUser(user.displayName)
      setLoading(false)
      // ...
    } else {
      // User is signed out
      // ...
      setLoading(false)
    }
  })

  return (
    <header className={styles.container}>
      <Logo />

      {loading ? null : <HeaderLogIn user={user} />}
    </header>
  )
}

export default Header
