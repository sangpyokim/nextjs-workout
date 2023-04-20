import { pushUser } from '../data/pushNotification'
import { getAllPushToken } from '../data/pushToken'

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
