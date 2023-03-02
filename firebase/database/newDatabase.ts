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

interface IMember {
  displayName: string
  email: string
}
export interface ICreateGroup {
  id: string
  chief: IMember
  title: string
  password?: string
  tag: string[]
  capacity: number
  description: string
}
interface IPostGroup {
  info: ICreateGroup
  users: {}
  chats: {
    notice: string
    chat: {}
  }
}
export interface IAllGroupList extends IPostGroup {}

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

  await set(ref(db, `users/${email.split('.')[0]}/`), data)
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
  const url = fn.userStatisticsTimeline!(userEmail, new Date(item.time))

  const res = await axios.post(url, item)
}
export const getTimeLine = async (
  userEmail: string,
  year: string,
  month: string,
) => {
  const fn = getUrl('statistics')
  const url = fn.userStatisticsTimeline!(userEmail, year, month)
  const res = await axios(url)
  return res.data
}

// --------------------------------------
// group
// [x] getGroup
// [x] getMyGroup
// [x] getAllGroup
// [x] create
// [x] join
// [] getGroupUsersData
// [] delete
// [] update
export const getGroupUsersData = async (groupID: string) => {
  const userListUrl = `https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/groups/${groupID}/users.json`

  const res = await axios(userListUrl)
  const userList = Object.keys(res.data)

  const userInfoUrl = userList.map((email: string) => getUserInfoUrl(email))
  const result = await axios.all(userInfoUrl.map((url) => axios(url)))

  return userList.map((email: string, i: number) => [email, result[i].data])
}
const getUserInfoUrl = (userEmail: string) => {
  const userListUrl = `https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/users/${
    userEmail.split('.')[0]
  }.json`
  return userListUrl
}
export const getAllGroup = async () => {
  const fn = getUrl('groups')
  const url = fn.getAllGroup!()

  const res = await axios(url)

  const data: [string, IAllGroupList][] = Object.entries(res.data)
  data.sort((a, b) => Number(b[1].info.id) - Number(a[1].info.id))
  return data || []
}

export const getMyGroup = async (userEmail: string) => {
  const fn = getUrl('groups')
  const url = fn.getMyGroup!(userEmail)
  const res = await axios(url)
  const groupId = await res.data
  if (!groupId) return []

  const groupData = await getGroup(Object.keys(groupId))
  return groupData
}
export const getGroup = async (groupIDArr: string[]) => {
  const fn = getUrl('groups')
  const urlArr = groupIDArr.map((groupID) => fn.getGroup!(groupID))

  const res = await axios.all(urlArr.map((url) => axios(url)))
  const data = res.map((r) => r.data)

  return data.map((d, i) => [groupIDArr[i], d])
}

// create
export const createGroup = async (
  userEmail: string,
  displayName: string,
  data: ICreateGroup,
) => {
  if (userEmail === '') return
  const fn = getUrl('groups')
  const { groupUrl } = fn.createGroup!(userEmail)
  // 만들고 참가
  const newUserEmail = userEmail.split('.')[0]
  const newData: IPostGroup = {
    info: data,
    users: { [newUserEmail]: { newUserEmail, displayName } },
    chats: {
      notice: '',
      chat: {
        [new Date().getTime()]: '새로운 채팅을 입력해보세요.',
      },
    },
  }

  const res = await axios({
    method: 'POST',
    url: groupUrl,
    data: newData,
  })
  const key = await res.data.name
  await joinGroup(userEmail, displayName, key)
}
// join,
// [] 그룹, users에 멤버 넣기
export const joinGroup = async (
  userEmail: string,
  displayName: string,
  groupID: string,
) => {
  const fn = getUrl('groups')
  const { userGroupUrl } = fn.createGroup!(userEmail)
  const url = fn.joinGroup!(groupID)

  await axios({
    method: 'PATCH',
    url: userGroupUrl,
    data: { [groupID]: groupID },
  })
  await axios({
    method: 'PATCH',
    url: url,
    data: {
      [userEmail.split('.')[0]]: {
        displayName: displayName,
        newUserEmail: userEmail.split('.')[0],
      },
    },
  })
}
