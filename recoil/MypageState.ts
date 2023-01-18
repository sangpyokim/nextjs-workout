import { atom } from 'recoil'
export const focusDate = atom({
  key: 'focusDate', // unique ID (with respect to other atoms/selectors)
  default: {
    date: new Date(),
  },
})
