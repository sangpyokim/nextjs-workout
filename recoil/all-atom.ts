import { atom } from 'recoil'
import { TTimerState, WorkOutListItem } from '../interface'
import { atomKeys } from './constants'
import { v1 } from 'uuid'

export const ATimerState = atom<TTimerState>({
  key: `${atomKeys.timerState}/${v1()}`,
  default: 'ready',
})

export const ASelectedWorkOutListItem = atom<WorkOutListItem | undefined>({
  key: atomKeys.selectWorkOutItem,
  default: undefined,
})

export const AWorkOutList = atom<WorkOutListItem[] | []>({
  key: atomKeys.workOutList,
  default: [],
})

export const ARemainTime = atom({
  key: atomKeys.remainTime,
  default: {
    first: '00:00:00',
    second: '00:00:00',
  },
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
