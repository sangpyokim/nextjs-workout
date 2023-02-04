import axios from 'axios'
import React, { ReactElement, useEffect, useState } from 'react'
import { QueryClient, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import Calender from '../../components/mypage/Calender'
import MyStory from '../../components/mypage/MyStory'
import { userInfo } from '../../recoil/ExercisesState'
import {
  CalenderMaker,
  getDateString,
  initCalender,
} from '../../utils/calender'

const Container = styled.div`
  width: 100%;
  padding: 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`

const MyPage = () => {
  const [user, _] = useRecoilState(userInfo)
  const calenderMaker = new CalenderMaker()

  return (
    <Container>
      <Calender calenderMaker={calenderMaker} />

      <MyStory calenderMaker={calenderMaker} />
    </Container>
  )
}

MyPage.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default MyPage
