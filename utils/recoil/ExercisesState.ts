import { atom } from 'recoil'

export const tempState = atom({
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
