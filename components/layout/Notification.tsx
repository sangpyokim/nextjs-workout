import { getMessaging } from 'firebase/messaging'
import React, { useEffect, useRef, useState } from 'react'
import { app, getTokens, onMessageListener } from '../../firebase'
import styled, { keyframes } from 'styled-components'

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

  return (
    <Container show={isNotification}>
      <Title>{notification?.title}</Title>
      <Body>{notification?.body}</Body>
      {isNotification && <ProgressBar />}
    </Container>
  )
}

export default Notification

const Container = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  background-color: var(--button-bg);
  padding: 12px;
  min-width: 120px;
  /* min-height: 60px; */

  color: white;

  position: fixed;
  top: 12px;
  right: ${(props) => (props.show ? '12px' : '-100px')};

  z-index: ${(props) => (props.show ? '10' : '-1')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: 0.2s all ease-in-out;
`
const Title = styled.div`
  font-size: 1rem;
  margin-bottom: 8px;
`
const Body = styled.div`
  font-size: 0.8rem;
`

const progress = keyframes`
  0% {
    width: 0%
  }
  100% {
    width: 100%;
  }
`

const ProgressBar = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;

  height: 3px;
  background-color: white;
  animation: ${progress} ${TIME}ms;
`

// 앱 처음 시작할때 토큰, 유효기간 생성 (2개월 정도)
//
