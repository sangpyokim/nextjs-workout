import { ReactElement } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`

const Home = (props: any) => {
  return (
    <Container>
      <div>랜딩 페이지 고민.</div>
    </Container>
  )
}
// Home.getLayout = Home
Home.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Home
