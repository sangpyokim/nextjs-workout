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
import { deleteUserTokenService } from '../../../server/service/pushToken'

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
    const listener = onAuthStateChanged(auth.auth, async (user) => {
      if (user) {
        const uid = user.uid
        updateUserEmail(user.email!.split('.')[0])
        setUser({
          email: user.email!,
          displayName: user.displayName!,
        })

        // 로그인 시 토큰 가져오기
        const messaging = getMessaging(app)
        const token = await getTokens(messaging)

        // 토큰 서버에 저장 // post, api/push, token
        const data = {
          email: user.email,
          token,
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

        setLoading(false)
      }
    })

    return () => {
      listener()
    }
  }, [])
}
