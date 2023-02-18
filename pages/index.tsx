import { Router, useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

// components
import FlatTimer from '../components/main/FlatTimer'
import { WorkOutListItem } from '../components/main/hooks/useNewWorkOutList'
import NewWorkOutList from '../components/main/NewWorkOutList'
import TimerWrapper from '../components/main/TimerWrapper'
import TodayWorkOutList from '../components/main/TodayWorkOutList'
import { updateUserProfile } from '../firebase/auth/NewAuth'

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

// 경로 2는 통계 페이지 -> 경로 3은 그룹페이지 -> 그룹 리스트 보여주기, 그룹만들기, 그룹찾기, 그룹 클릭시 사용자 보여주기, 사용자 통계볼 수 있도록하기..
// 일, 주, 월 단위로 표시

// 세부내용
// 일: 달력에 총 시간 내역 표시, 오늘날짜 표시, 선택된날 타이머정보 표시(양에따라서 색표시), 어떤 아이템을 몇분 햇는지 차트에 퍼센트로표현, 타이머를 언재사용했는지 표시, 타임라인표시

// 주: 주단위로 총시간 표시,
// 월 월단위로 총시간 표시

const Home = () => {
  // useEffect(() => {
  //   window.addEventListener('beforeunload', (e) => {
  //     e.preventDefault()
  //     e.returnValue = '123'
  //   })

  //   return () =>
  //     window.removeEventListener('beforeunload', (e) => {
  //       e.preventDefault()
  //       alert('Asd')
  //     })
  // })

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
