import axios from 'axios'
import { ENDPOINT } from '../constants'
import { IPostGroup } from '../../interface'

export async function getAllGroup() {
  const url = ENDPOINT.ALL_GROUP_URL

  const res = await axios(url)
  const data = res.data

  return data
}

export async function getGroup(groupID: string) {
  const url = ENDPOINT.GROUP_URL(groupID)

  const res = await axios(url)

  return res.data
}

export async function createGroup(data: IPostGroup) {
  const url = ENDPOINT.ALL_GROUP_URL

  const res = await axios({
    method: 'POST',
    url,
    data,
  })

  const key = await res.data.name
  return key
}

export async function getGroupUserData(userList: string[]) {
  const userInfoUrl = userList.map((email: string) => ENDPOINT.USER_URL(email))

  const result = await axios.all(userInfoUrl.map((url) => axios(url)))

  return userList.map((email: string, i: number) => [email, result[i].data])
}
