import { atom } from 'recoil'

export const exerciseDataList = atom({
  key: 'tempState', // unique ID (with respect to other atoms/selectors)
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
  key: 'userInfo',
  default: {
    email: '',
    displayName: '',
  },
})

export const authLoading = atom({
  key: 'authLoading',
  default: true,
})
