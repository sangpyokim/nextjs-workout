import axios from 'axios'
import { set, ref } from 'firebase/database'
import { TShowMode, TTimerMode } from '../../components/main/hooks/useFlatTimer'
import { WorkOutListItem } from '../../components/main/hooks/useNewWorkOutList'
import { getUrl } from '../firebaseUrl'
import { database } from './../../firebase'

interface ITimerSettingValue {
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
export const writeUserData = async (email: string) => {
  const db = getMyDB()

  await set(ref(db, `users/${email.split('@')[0]}/settings`), {
    timer: {
      mode: 'normal',
      type: 'double',
      t1: 90,
      t2: 30,
    },
  })
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

// 수정 -> url얻기, 덮어씌울 데이터 받기, put하기
// 삭제 구현
