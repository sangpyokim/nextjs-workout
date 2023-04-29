import axios from 'axios'
import { IAllGroupList, ICreateGroup, IPostGroup } from '../../interface'
import { ENDPOINT } from '../constants'
import {
  createGroup,
  getAllGroup,
  getGroup,
  getGroupUserData,
} from '../data/group'
import { joinGroup } from '../data/member'

// 모든 그룹 가져오기
export async function getAllGroupService() {
  const allGroupData = await getAllGroup()

  const data: [string, IAllGroupList][] = Object.entries(allGroupData)
  data.sort((a, b) => Number(b[1].info.id) - Number(a[1].info.id))

  return data
}

// 특정 그룹 가져오기
export async function getGroupService(groupID: string) {
  const data = await getGroup(groupID)

  return data
}
// 특정 그룹의 유저들의 정보가져오기
export async function getGroupUserDataService(userList: string[]) {
  const data = await getGroupUserData(userList)

  return data
}

// 특정 그룹의 정보와 유저들의 정보 가져오기
export async function getGroupAndUserDataService(groupID: string) {
  const groupData = await getGroupService(groupID)
  const userData = await getGroupUserDataService(Object.keys(groupData.users))

  return { groupData, userData }
}

// 그룹 만들기
export async function createGroupService(
  userEmail: string,
  displayName: string,
  data: any,
) {
  const newUserEmail = userEmail.split('.')[0]
  const createGroupData: ICreateGroup = {
    id: new Date().getTime().toString(),
    capacity: Number(data.capacity),
    chief: {
      email: userEmail,
      displayName: displayName,
    },
    tag: [String(data.tag)],
    title: String(data.title),
    description: String(data.description),
  }

  const newData: IPostGroup = {
    info: createGroupData,
    users: { [newUserEmail]: { newUserEmail, displayName } },
    chats: {
      notice: '',
      chat: {
        [new Date().getTime()]: {
          content: '',
          writer: {
            displayName: 'operator',
            email: 'operator',
          },
          type: 'notice',
          id: new Date().getTime(),
        },
      },
    },
  }

  const groupKey = await createGroup(newData)

  // 유저정보에 그룹id 추가
  await joinGroup(newUserEmail, displayName, groupKey)
}
