const END_POINT = 'https://fcm.googleapis.com/fcm/send'
const AUTH_KEY =
  'key=AAAA1Vjp58o:APA91bFVuSEHE4rfENtLLBWDLVHmxGJES86jd-pun37wPAaklIxM9TKEyfcyfRLIr6-cbBBu1rLgEI3or89_a2MFgmwLnCypBY7hKQkp43k_88OgZo-wXALcf8_TJHLzt_JfWA61tn4c'
const CONTENT_TYPE = 'application/json'
const headers = {
  Authorization: AUTH_KEY,
  'Content-Type': CONTENT_TYPE,
}

export async function pushUser(token: string, title: string, body: string) {
  return await fetch(END_POINT, {
    method: 'post',
    headers: headers,
    body: JSON.stringify({
      to: token,
      notification: {
        title,
        body,
      },
    }),
  })
}
