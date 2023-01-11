import React, { FormEvent, ReactElement, useRef, useState } from 'react'
import styled from 'styled-components'
import Calender from '../../components/diet/Calender'
import { getFoodData } from '../../utils/dataFetch'
import {
  getDateString,
  getKoreaDateString,
  initCalender,
} from '../../utils/calender'
import { authLoading, userInfo } from '../../utils/recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import { getUserAllData } from '../../utils/firebase/FireStore'
import { useQuery } from 'react-query'
import FoodSearch from '../../components/organisms/FoodSearch'
import { useCalenders } from '../../components/diet/hooks/useCalenders'

const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
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
const Diet = ({ calenderList }: ICalender) => {
  return (
    <Container>
      <Calender calenderList={calenderList} />
      <FoodSearch />
    </Container>
  )
}
// Diet.getLayout = Diet
Diet.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Diet
