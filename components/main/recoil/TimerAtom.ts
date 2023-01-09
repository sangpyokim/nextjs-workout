import { atom } from 'recoil'

const INIT_MAX_TIME_LIMIT = 120
const INIT_START_TIME = 30

export const AStartToggle = atom({
  key: 'startToggle',
  default: false,
})

export const AMaxTime = atom({
  key: 'maxTime',
  default: INIT_MAX_TIME_LIMIT,
})
export const AStartTime = atom({
  key: 'startTime',
  default: INIT_START_TIME,
})
