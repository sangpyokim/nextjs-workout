// 토큰 CRUD

import { ENDPOINT } from '../constants'
import { IToken } from '../types'

// 토큰 C, U 동일
// 토큰 테이블에 토큰, 만료날짜 저장
export async function updateUserPushToken(email: string, data: IToken) {
  email = email.split('.')[0]

  const url = ENDPOINT.TOKEN_URL(email)

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

// 토큰 R
// 토큰 테이블에서 토큰, 만료날짜 가져오기
export async function getAllPushToken() {
  const url = ENDPOINT.ALL_TOKEN_URL
  const res = await fetch(url)
  const json = await res.json()

  return json
}
export async function getUserPushToken(email: string) {
  email = email.split('.')[0]

  const url = ENDPOINT.TOKEN_URL(email)

  const res = await fetch(url)
  const json: IToken = await res.json()
  return json
}

// 토큰 D
// 토큰 삭제
export async function deleteUserPushToken(email: string) {
  email = email.split('.')[0]
  const url = ENDPOINT.TOKEN_URL(email)

  const res = await fetch(url, {
    method: 'delete',
  })
}
