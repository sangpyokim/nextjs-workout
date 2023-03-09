import { GetServerSideProps } from 'next'
import { ReactElement } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'

// components
import FlatTimer from '../components/main/FlatTimer'
import NewWorkOutList from '../components/main/NewWorkOutList'

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()

  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
    },
  }
}

const Home = () => {
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
