import { useModal } from '../../main/hooks/useModal'
import { useState } from 'react'
import { userInfo, authLoading } from '../../../recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import { getMyAuth, pcLogIn } from '../../../firebase/auth/Auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [loading, setLoading] = useRecoilState(authLoading)
  const [authState, setAuthState] = useState('')
  const { auth } = getMyAuth()
  const { open, setOpen } = useModal()

  const router = useRouter()

  const modalClose = (open: boolean) => {
    setOpen(open)
    setAuthState('')
  }

  const signOut = () => {
    auth.signOut()
    localStorage.clear()
    router.reload()
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
        router.reload()
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
