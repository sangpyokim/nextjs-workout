import { getMessaging } from 'firebase/messaging'
import React, { useEffect, useRef, useState } from 'react'
import { app, getTokens, onMessageListener } from '../../firebase'
import styled from 'styled-components'

const TIME = 2000

const Notification = () => {
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

  if (!isNotification) return <></>

  return (
    <Container>
      <Title>{notification.title}</Title>
      <Body>{notification.body}</Body>
    </Container>
  )
}

export default Notification

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  background-color: var(--button-bg);
  padding: 12px;
  min-width: 120px;

  position: fixed;
  top: 12px;
  right: 12px;
  color: white;
`
const Title = styled.div`
  font-size: 1rem;
  margin-bottom: 8px;
`
const Body = styled.div`
  font-size: 0.8rem;
`

// 앱 처음 시작할때 토큰, 유효기간 생성 (2개월 정도)
//
