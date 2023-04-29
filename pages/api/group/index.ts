import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createGroupService,
  getAllGroupService,
} from '../../../server/service/groupService'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const data = await getAllGroupService()
    return res.status(201).json(data)
  } else if (req.method === 'POST') {
    // 그룹 생성하기
    const { email, displayName, data } = req.body

    await createGroupService(email, displayName, data)

    res.end()
  }
}
