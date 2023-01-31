import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import Calender from '../../components/mypage/Calender'
import MyStory from '../../components/mypage/MyStory'
import { getDateString, initCalender } from '../../utils/calender'

const Container = styled.div`
  width: 100%;
  padding: 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`

export async function getStaticProps() {
  return {
    props: {
      calenderList: initCalender(getDateString()),
    }, // will be passed to the page component as props
  }
}
interface ICalender {
  calenderList: number[][]
}

const MyPage = ({ calenderList }: ICalender) => {
  const [curFocus, setCurFocus] = useState()
  return (
    <Container>
      <Calender
        calenderList={calenderList}
        setCurFocus={setCurFocus}
      />

      <MyStory curFocus={curFocus} />
    </Container>
  )
}

MyPage.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default MyPage
