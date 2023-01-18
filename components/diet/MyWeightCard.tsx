import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    height: 300px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;

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
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid #252525;
  margin-bottom: 4px;
`
const DynamicWeightGraph = dynamic(() => import('./WeightGraph'), {
  ssr: false,
})
const MyWeightCard = () => {
  return (
    <Container>
      <Title>나의 체중 목표</Title>

      <DynamicWeightGraph />
    </Container>
  )
}

export default MyWeightCard
