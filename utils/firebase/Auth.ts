import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth'
import { app } from '../../firebase'

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
export const mobileLogIn = () => {
  const { auth, provider } = getMyAuth()

  try {
    signInWithRedirect(auth, provider)
  } catch (error) {
    console.log(error)
  }
}

export const pcLogIn = () => {
  const { auth, provider } = getMyAuth()

  try {
    signInWithPopup(auth, provider)
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
