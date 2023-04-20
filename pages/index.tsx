import { ReactElement } from 'react'
import styled from 'styled-components'
// components
import FlatTimer from '../components/main/FlatTimer'
import NewWorkOutList from '../components/main/NewWorkOutList'

const Home = (props: any) => {
  return (
    <Container>
      <FlatTimer />
      <NewWorkOutList />
    </Container>
  )
}
// Home.getLayout = Home
Home.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Home

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`
