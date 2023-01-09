import React, { FormEvent, ReactElement, useRef, useState } from 'react'
import styled from 'styled-components'
import Calender from '../../components/Calender'
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
  const [aLoading, setALoading] = useRecoilState(authLoading)
  const [user, setUser] = useRecoilState(userInfo)

  const { data, isLoading } = useQuery(
    ['userAllData'],
    () => {
      const curDate = getKoreaDateString(new Date())
      return getUserAllData(user.email.split('@')[0], curDate)
    },
    {
      enabled: !aLoading && user.email.length > 0,
    },
  )

  if (aLoading || isLoading) return <div>loading</div>

  return (
    <Container>
      <Calender
        calenderList={calenderList}
        data={data?.exerciseData || []}
      />
      <FoodSearch />
    </Container>
  )
}
// Diet.getLayout = Diet
Diet.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Diet
