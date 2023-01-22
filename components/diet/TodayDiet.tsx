import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    height: 280px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  margin-bottom: 20px;
  font-family: sans-serif;

  border: 0;
  border-radius: 8px;

  height: 240px;
  width: 100%;
  max-width: 100%;
  /* 뉴몰피즘 */
  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
`

const TodayDiet = () => {
  return <Container>오늘 먹은 식단 리스트 업</Container>
}

export default TodayDiet
