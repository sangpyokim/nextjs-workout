import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createGroupService,
  getAllGroupService,
  getGroupAndUserDataService,
  getGroupService,
} from '../../../server/service/groupService'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 그룹 가져오기
  if (req.method === 'GET') {
    const { groupID } = req.query
    const data = await getGroupAndUserDataService(String(groupID))
    console.log(data)
    return res.status(201).json(data)
  }
}
