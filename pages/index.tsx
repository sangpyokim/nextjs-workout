import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'
import styled from 'styled-components'

// layout
import Layout from '../components/layout/layout'
import NestedLayout from '../components/layout/nested-layout'

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

const Home: NextPageWithLayout = (props: any) => {
  return (
    <Container>
      {/* 데이터 가져와서 initSec 변경 시켜주기 */}
      <TimerWrapper />

      <TodayWorkOutList />
    </Container>
  )
}
// Home.getLayout = Home
Home.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Home
