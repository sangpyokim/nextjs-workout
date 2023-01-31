import React from 'react'
import styled from 'styled-components'
import { IFood, useFoodSearch } from './hooks/useFoodSearch'

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
const Title = styled.header`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid #252525;
  margin-bottom: 16px;
`
const TodayDiet = () => {
  const { foodList, isLoading } = useFoodSearch()

  if (isLoading || !foodList)
    return (
      <Container>
        <Title>오늘의 식단</Title>
      </Container>
    )

  if (foodList.length === 0)
    return (
      <Container>
        <Title>
          <div>오늘의 식단</div>
        </Title>
        오늘 먹은 음식을 등록해주세요
      </Container>
    )

  return (
    <Container>
      <Title>
        <div>오늘의 식단</div>
      </Title>

      <div>
        {foodList.map((item: IFood) => (
          <div key={item.name}>{item.name}</div>
        ))}
      </div>
    </Container>
  )
}

export default TodayDiet
