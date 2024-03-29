import { useModal } from '../../main/hooks/useModal'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { getMyAuth, pcLogIn } from '../../../firebase/auth/Auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { TIMER_KEY } from '../../../localstorage/Constants'
import { INITIAL_VALUE } from '../../../firebase/initialValue'
import { authLoading, userInfo } from '../../../recoil/all-atom'

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

  const signOut = async () => {
    await auth.signOut()
    localStorage.removeItem(TIMER_KEY.userEmail)
    _setLocalStorage(TIMER_KEY.timerSetting, INITIAL_VALUE.settings.timer)
    modalClose(false)
    if (router.pathname === '/') router.reload()
    else await router.push('/')
  }
  const _setLocalStorage = (key: string, val: any) => {
    const value = JSON.stringify(val)
    localStorage.setItem(key, value)
  }
  const googleLogIn = async () => {
    await pcLogIn()
    await router.push('/')
  }

  const logIn = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
    password: string,
  ) => {
    e.preventDefault()

    await signInWithEmailAndPassword(auth, id, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
        if (router.pathname === '/') router.reload()
        else router.push('/')
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
