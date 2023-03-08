import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth'
import { app } from '../../firebase'

export const signOut = async () => {
  const auth = getAuth(app)
  auth.signOut()
}
export const isLoggedIn = () => {
  const auth = getAuth(app)
  return auth ? true : false
}
export const getMyAuth = () => {
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider() // provider를 구글로 설정

  return { auth, provider }
}
export const getUserId = async () => {
  const auth = getAuth(app)
  return auth.currentUser?.email?.split('@')[0]
}
export const mobileLogIn = async () => {
  const { auth, provider } = getMyAuth()
  await signInWithRedirect(auth, provider)
}

export const pcLogIn = async () => {
  const { auth, provider } = getMyAuth()
  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.log(error)
  }
}
export const logOut = () => {
  const { auth, provider } = getMyAuth()

  try {
    auth.signOut()
  } catch (error) {
    console.log(error)
  }
}
