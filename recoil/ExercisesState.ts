import { atomKeys } from './constants'
import { atom } from 'recoil'

export const exerciseDataList = atom({
  key: atomKeys.exerciseDataList, // unique ID (with respect to other atoms/selectors)
  default: [
    {
      bodyPart: '',
      equipment: '',
      gifUrl: '',
      id: '',
      name: '',
      target: '',
    },
  ], // default value (aka initial value)
})

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
