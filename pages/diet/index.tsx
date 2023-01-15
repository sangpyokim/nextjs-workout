import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Calender from '../../components/diet/Calender'
import { getDateString, initCalender } from '../../utils/calender'
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
