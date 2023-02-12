import { ReactElement, useRef } from 'react'
import styled from 'styled-components'

// components
import FlatTimer from '../components/main/FlatTimer'
import TimerWrapper from '../components/main/TimerWrapper'
import TodayWorkOutList from '../components/main/TodayWorkOutList'

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* flex-wrap: wrap;
  align-items: flex-start; */
  /* padding-bottom: 60px; */
`

const Home = (props: any) => {
  return (
    <Container>
      <FlatTimer />

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
