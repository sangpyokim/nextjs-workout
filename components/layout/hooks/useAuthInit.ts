import { useRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useMemo } from 'react'
import { getMyAuth } from '../../../firebase/auth/NewAuth'
import { updateUserEmail } from '../../../localstorage/LocalStorage'

import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import { authLoading, userInfo } from '../../../recoil/all-atom'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export const useAuthInit = () => {
  const [_, setUser] = useRecoilState(userInfo)
  const [loading, setLoading] = useRecoilState(authLoading)

  const router = useRouter()

  const auth = getMyAuth()

  useEffect(() => {
    const listener = onAuthStateChanged(auth.auth, (user) => {
      if (user) {
        const uid = user.uid
        updateUserEmail(user.email!.split('.')[0])
        setUser({
          email: user.email!,
          displayName: user.displayName!,
        })
        setLoading(false)
      } else {
        setUser({ email: '', displayName: '' })
        setLoading(false)
      }
    })

    return () => {
      listener()
    }
  }, [])
}
