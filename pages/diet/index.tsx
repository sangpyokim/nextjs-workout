import React, { ReactElement } from 'react'
import styled from 'styled-components'
import FoodSearch from '../../components/diet/FoodSearch'
import { useDiet } from '../../components/diet/hooks/useDiet'
import TodayDiet from '../../components/diet/TodayDiet'

import MyWeightCard from '../../components/diet/MyWeightCard'

const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Diet = () => {
  // 유저의 다이어트 과정 데이터 가져오기
  // 유저의 오늘 식단 데이터 가져오기,
  // 유저 식품 검색하기
  // 유저 식단 기록하기

  const { data } = useDiet()

  return (
    <Container>
      <MyWeightCard />
      <TodayDiet />
      <FoodSearch />
    </Container>
  )
}
// Diet.getLayout = Diet
Diet.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Diet
