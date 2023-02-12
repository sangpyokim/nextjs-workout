import { ReactElement } from 'react'
import styled from 'styled-components'

// components
import TimerWrapper from '../components/main/TimerWrapper'
import TodayWorkOutList from '../components/main/TodayWorkOutList'

const Container = styled.div`
  width: 100%;
  padding: 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`

const Home = (props: any) => {
  return (
    <Container>
      {/* <TimerWrapper /> */}

      {/* <TodayWorkOutList /> */}
    </Container>
  )
}
// Home.getLayout = Home
Home.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Home
