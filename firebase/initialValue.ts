import { ITimerSettingValue } from './database/newDatabase'

const timer: ITimerSettingValue = {
  mode: 'normal',
  type: 'double',
  t1: 90,
  t2: 30,
}
export const INITIAL_VALUE = {
  settings: {
    timer,
  },
}
