import React from 'react'
import { isLoggedIn, signOut } from '../../firebase/auth/Auth'
import GoogleLogInButton from '../atoms/GoogleLogInButton'

interface IHeaderLogIn {
  user: string | null | undefined
}

const HeaderLogIn = ({ user }: IHeaderLogIn) => {
  return (
    <div>
      {user ? (
        <div onClick={() => signOut()}>{`${user}님`}</div>
      ) : (
        <div>
          <GoogleLogInButton />
        </div>
      )}
    </div>
  )
}

export default HeaderLogIn
