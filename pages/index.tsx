import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'
// components
import FlatTimer from '../components/main/FlatTimer'
import NewWorkOutList from '../components/main/NewWorkOutList'

//123123
import { getMessaging, onMessage, getToken } from 'firebase/messaging'
import { app } from '../firebase'

const key =
  'BAyqwt3M2ODBribS4kpMTaKEhgHAv3udhNanPdIBrff82Gd419NTyqbVMp8nUIKWpyVnQ-3t8kYSIBlhEnyuzSo'
const Home = (props: any) => {
  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
    const firebaseApp = app

    const messaging = getMessaging(firebaseApp)

    // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
    getToken(messaging, { vapidKey: key })
      .then((currentToken) => {
        if (currentToken) {
          // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
          console.log('token')
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          )
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
      })

    // 메세지가 수신되면 역시 콘솔에 출력합니다.
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
    })
  }

  useEffect(() => {
    onMessageFCM()
  }, [])

  return (
    <Container>
      <FlatTimer />

      <NewWorkOutList />
    </Container>
  )
}
// Home.getLayout = Home
Home.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Home

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`
