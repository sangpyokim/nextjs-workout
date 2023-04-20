import type { NextApiRequest, NextApiResponse } from 'next'
import { postUserTokenService } from '../../../server/service/pushToken'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 토큰 저장하기
  if (req.method === 'POST') {
    const { token, email } = JSON.parse(req.body)

    await postUserTokenService(token, email)
    return res.end()
  }
  // 토큰 삭제하기
  else if (req.method === 'DELETE') {
    return res.end()
  } else {
    return res.end()
  }
}
