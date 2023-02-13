import { useRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { authLoading, userInfo } from '../../recoil/ExercisesState'
import { getMyAuth } from '../../firebase/auth/Auth'

export const useAuthInit = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [loading, setLoading] = useRecoilState(authLoading)
  const auth = getMyAuth()

  useEffect(() => {
    const listener = onAuthStateChanged(auth.auth, (user) => {
      if (user) {
        const uid = user.uid
        setUser({
          email: user.email!,
          displayName: user.displayName || '김상표',
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
