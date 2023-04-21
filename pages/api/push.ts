import type { NextApiRequest, NextApiResponse } from 'next'
import { pushAllUser, pushUsers } from '../../server/service/pushNotification'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 모든 유저 알림 보내기
  if (req.method === 'POST') {
    const [...user] = JSON.parse(req.body)

    // 1. 토큰들가져오기
    // 2. 토큰으로 알람보내기
    if (!user) {
      pushAllUser()
    } else {
      pushUsers(user)
    }
    return res.end()
  } else {
    return res.end()
  }
}
