import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { NextPageWithLayout } from '../_app'

const Container = styled.div`
  width: 100%;
  padding: 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`

const MyPage: NextPageWithLayout = (props: any) => {
  return (
    <Container>
      <div>123</div>
    </Container>
  )
}

MyPage.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default MyPage
