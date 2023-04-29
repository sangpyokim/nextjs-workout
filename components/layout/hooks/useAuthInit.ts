import { useRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useMemo } from 'react'
import { getMyAuth } from '../../../firebase/auth/NewAuth'
import { updateUserEmail } from '../../../localstorage/LocalStorage'

import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import { authLoading, userInfo } from '../../../recoil/all-atom'
import { app, getTokens } from '../../../firebase'
import { getMessaging } from 'firebase/messaging'
import nookies from 'nookies'

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
    const listener = auth.auth.onIdTokenChanged(async (user) => {
      if (user) {
        const uid = user.uid
        updateUserEmail(user.email!.split('.')[0])
        setUser({
          email: user.email!,
          displayName: user.displayName!,
        })
        const idToken = await user.getIdToken()
        nookies.destroy(null, 'idToken')
        nookies.set(null, 'idToken', idToken, { path: '/' })
        // FCM 푸시알람
        // 로그인 시 토큰 가져오기
        const messaging = getMessaging(app)
        const pushToken = await getTokens(messaging)
        // 토큰 서버에 저장 // post, api/push, token
        const data = {
          email: user.email,
          token: pushToken,
        }

        fetch(`/api/pushtoken/${user.email?.split('.')[0]}`, {
          method: 'POST',
          body: JSON.stringify(data),
        })

        setLoading(false)
      } else {
        // 토큰 삭제 요청 // delete, api/push
        // deleteUserTokenService(user!.email!)

        setUser({ email: '', displayName: '' })
        nookies.set(null, 'idToken', '', { path: '/' })
        setLoading(false)
      }
    })

    return () => {
      listener()
    }
  }, [])
}
