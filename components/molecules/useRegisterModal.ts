import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import {
  getUserProfile,
  IProfile,
  registerUser,
  updateUserProfile,
} from '../../firebase/auth/NewAuth'
import { writeUserData } from '../../firebase/database/newDatabase'
import { userInfo } from '../../recoil/ExercisesState'
import { useModal } from '../main/hooks/useModal'

export const useRegisterModal = () => {
  const [authState, setAuthState] = useState('')
  const router = useRouter()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const summitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const profile: IProfile = {
      name: nameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    }

    // 회원 기본정보 데이터베이스 만들기. 이멜 기반
    await writeUserData(profile.email)
    await registerUser(profile, setAuthState)
      .then(() => router.reload())
      .catch((e) => console.log(e))
  }

  return {
    nameRef,
    emailRef,
    passwordRef,
    summitRegister,
    authState,
  }
}
