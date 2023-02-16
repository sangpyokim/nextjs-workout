import { ReactElement, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

// components
import FlatTimer from '../components/main/FlatTimer'
import { WorkOutListItem } from '../components/main/hooks/useNewWorkOutList'
import NewWorkOutList from '../components/main/NewWorkOutList'
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

const Home = () => {
  // 결론: 타이머의 상태를 구독하고 선택된것의 타이머를 증가시키자...!!

  return (
    <Container>
      <FlatTimer />

      <NewWorkOutList />

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
