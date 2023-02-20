import { INITIAL_VALUE } from '../initialValue'
import axios from 'axios'
import { set, ref } from 'firebase/database'
import {
  TShowMode,
  TTimerMode,
  TTimerState,
} from '../../components/main/hooks/useFlatTimer'
import { WorkOutListItem } from '../../components/main/hooks/useNewWorkOutList'
import { getUrl } from '../firebaseUrl'
import { database } from './../../firebase'

export interface ITimerSettingValue {
  mode: TShowMode
  type: TTimerMode
  t1: number
  t2: number
}

export const getMyDB = () => {
  const db = database

  return db
}
// ------------------------ settings/timer
export const writeUserData = async (email: string, data = INITIAL_VALUE) => {
  const db = getMyDB()

  await set(ref(db, `users/${email.split('.')[0]}/settings`), data)
}
export const getTimerSettingValue = async (userEmail: string) => {
  const fn = getUrl('users')
  const url = fn.userTimerSettingUrl!(userEmail)

  const res = await axios(url)

  const settings: ITimerSettingValue = res.data
  return settings
}

// ------------------- timer/list
export const getTimerListToday = async (userEmail: string | null) => {
  if (!userEmail) return []

  const fn = getUrl('users')
  const url = fn.userTimerListTodayUrl!(userEmail)
  const res = await axios.get(url)
  const data: WorkOutListItem[] = res.data

  return data
}

export const updateWorkOutList = async (
  userEmail: string,
  arr: WorkOutListItem[],
) => {
  const fn = getUrl('users')
  const url = fn.userTimerListTodayUrl!(userEmail)

  const res = await axios.put(url, arr)
}

// ---------------------------------------
// statistics
// [x] statistics/timeline/날짜
// [x] statistics/prefixSum/날짜
// [] statistics/realtime

export interface ITimeLineItem {
  title: string
  time: string
  type: TTimerState
}

export const pushWorkOutItemInTimeLine = async (
  userEmail: string,
  item: ITimeLineItem,
) => {
  const fn = getUrl('statistics')
  const url = fn.userStatisticsTimeline!(userEmail, item.time)

  const res = await axios.post(url, item)
}
