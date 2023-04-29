import axios from 'axios'
import { ENDPOINT } from '../constants'

export const joinGroup = async (
  userEmail: string,
  displayName: string,
  groupID: string,
) => {
  const url1 = ENDPOINT.USER_GROUP_URL(userEmail)
  const url2 = ENDPOINT.GROUP_USER_URL(groupID)

  await axios({
    method: 'PATCH',
    url: url1,
    data: { [groupID]: groupID },
  })

  await axios({
    method: 'PATCH',
    url: url2,
    data: {
      [userEmail.split('.')[0]]: {
        displayName: displayName,
        newUserEmail: userEmail.split('.')[0],
      },
    },
  })
}
