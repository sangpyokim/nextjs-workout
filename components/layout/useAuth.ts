import { useModal } from './../main/hooks/useModal'
import { useEffect, useState } from 'react'
import { userInfo, authLoading } from '../../recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import { getMyAuth, pcLogIn } from '../../firebase/auth/Auth'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [loading, setLoading] = useRecoilState(authLoading)
  const [authState, setAuthState] = useState('')
  const { auth } = getMyAuth()

  const { open, setOpen } = useModal()

  const modalClose = (open: boolean) => {
    setOpen(open)
    setAuthState('')
  }

  const signOut = () => {
    auth.signOut()
  }
  const googleLogIn = () => {
    // setImageState(Pressed)
    // if (isPlatformPC()) {
    // } else {
    //   mobileLogIn()
    // }
    pcLogIn()
  }

  const logIn = (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    password: string,
  ) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, id, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setAuthState('로그인에 실패하였습니다.')
      })
  }

  return {
    open,
    setOpen,
    modalClose,
    user,
    loading,
    signOut,
    googleLogIn,
    logIn,
    authState,
  }
}
