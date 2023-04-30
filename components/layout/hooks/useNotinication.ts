import { getMessaging } from 'firebase/messaging'
import { useEffect, useState } from 'react'
import { app, getTokens, onMessageListener } from '../../../firebase'

const TIME = 2000

export const Notification = () => {
  const [prevTime, setPrevTime] = useState(0)

  const [isNotification, setIsNotification] = useState(false)
  const [notification, setNotification] = useState<any>()

  useEffect(() => {
    const messaging = getMessaging(app)
    getTokens(messaging)

    onMessageListener(messaging)
      .then(async (payload: any) => {
        const cur = new Date().getTime()
        if (cur - prevTime < TIME) return

        setNotification(payload.notification)

        setIsNotification(true)
        setTimeout(() => {
          setIsNotification(false)
        }, TIME)

        setPrevTime(cur)
      })
      .catch((err) => console.log('failed: ', err))
  }, [prevTime])

  return {}
}
