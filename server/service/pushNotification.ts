import { pushUser } from '../data/pushNotification'
import { getUserPushToken } from '../data/pushToken'
import { getAllPushToken } from '../data/pushToken'

export async function pushUsers(users: []) {
  const tokens = await Promise.all(
    users.map(async (user) => await getUserPushToken(user)),
  )

  const res = []
  for (let i in tokens) {
    if (!tokens[i]) continue

    const token = tokens[i].token
    res.push(pushUser(token, '모임 깨우기', '일어나서 활동을 시작하세요!'))
  }

  Promise.all(res)
}

export async function pushAllUser() {
  const tokens = await getAllPushToken()

  const res = []
  for (let email in tokens) {
    res.push(
      pushUser(
        tokens[email].token,
        '모임 깨우기',
        '일어나서 활동을 시작하세요!',
      ),
    )
  }

  Promise.all(res)
}
