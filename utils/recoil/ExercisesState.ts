import { atom } from 'recoil'

export const exercisesState = atom({
  key: 'exercisesState', // unique ID (with respect to other atoms/selectors)
  default: [1, 2, 3], // default value (aka initial value)
})
