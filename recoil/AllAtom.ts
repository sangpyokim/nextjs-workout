import { atom } from 'recoil'
import { TTimerState } from '../components/main/hooks/useFlatTimer'
import { WorkOutListItem } from '../components/main/hooks/useNewWorkOutList'
import { atomKeys } from './constants'

export const ATimerState = atom<TTimerState>({
  key: atomKeys.timerState,
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
