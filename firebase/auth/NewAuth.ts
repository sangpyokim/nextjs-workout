import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth'
import { app } from '../../firebase'
import { writeUserData } from '../database/newDatabase'

export interface IProfile {
  email: string
  password: string
  name: string
}

export const getMyAuth = () => {
  const auth = getAuth(app)

  return { auth }
}

export const getUserProfile = async () => {
  const { auth } = getMyAuth()

  const user = auth.currentUser
  return user
}

export const updateUserProfile = async (profile: IProfile) => {
  const { auth } = getMyAuth()
  await updateProfile(auth.currentUser!, {
    displayName: profile.name,
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      console.log(error)
      // An error occurred
      // ...
    })
}

// 회원가입.
// 이메일, 비밀번호, 이름
// uid로 데이터 가져오기

export const registerUser = async (profile: IProfile, setState: Function) => {
  try {
    await _makeUser(profile, setState)
  } catch (error) {
    throw error
  }
  // await updateUserProfile(profile)
}

const _makeUser = async (profile: IProfile, setState: Function) => {
  const auth = getAuth()
  await createUserWithEmailAndPassword(auth, profile.email, profile.password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user
      await updateProfile(user, {
        displayName: profile.name,
      })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      if (errorCode === 'auth/email-already-in-use') {
        setState('이미 존재하는 이메일 입니다.')
        throw errorCode
      } else {
        setState('회원가입에 실패하였습니다.')
        throw errorCode
      }
      // ..
    })
}
