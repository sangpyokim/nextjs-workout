import { useRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { authLoading, userInfo } from '../../../recoil/ExercisesState'
import { getMyAuth } from '../../../firebase/auth/NewAuth'
import {
  clearTimerValue,
  updateUserEmail,
} from '../../../localstorage/LocalStorage'

export const useAuthInit = () => {
  const [_, setUser] = useRecoilState(userInfo)
  const [loading, setLoading] = useRecoilState(authLoading)
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
        clearTimerValue()
        setUser({ email: '', displayName: '' })
        setLoading(false)
      }
    })

    return () => {
      listener()
    }
  }, [])
}
