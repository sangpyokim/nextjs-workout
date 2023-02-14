import { atomKeys } from './constants'
import { atom } from 'recoil'
import { Day } from '../utils/calender'
import { WorkOutListItem } from '../components/main/hooks/useNewWorkOutList'

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

export const curFocusDay = atom({
  key: atomKeys.curFocusDay,
  default: new Day(-1, false, false),
})
