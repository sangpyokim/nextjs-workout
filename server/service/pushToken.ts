// 비지니스 로직
// 1. 토큰 저장 엑세스 계층 호출
// 2. 만료날짜 생성

import { updateUserPushToken, deleteUserPushToken } from '../data/pushToken'
import { IToken } from '../types'

// 토큰 삭제
export async function deleteUserTokenService(email: string) {
  deleteUserPushToken(email)
}

// 토큰 저장
export async function postUserTokenService(token: string, email: string) {
  const expireDate = createExpireDate()
  const data: IToken = {
    expireDate,
    token,
  }
  updateUserPushToken(email, data)
}

function createExpireDate() {
  const now = new Date()
  const oneMonthLater = new Date(now.setMonth(now.getMonth() + 1)) // 한달 후
  return oneMonthLater.toString()
}
