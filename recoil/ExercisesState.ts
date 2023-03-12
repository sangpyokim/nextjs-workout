import { atomKeys } from './constants'
import { atom } from 'recoil'

export const userInfo = atom({
  key: atomKeys.userInfo,
  default: {
    email: '',
    displayName: '',
  },
})

export const authLoading = atom({
  key: atomKeys.authLoading,
  default: true,
})
