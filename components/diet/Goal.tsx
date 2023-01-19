import React from 'react'
import styled from 'styled-components'

interface IGoal {
  target: string
  label: string
}

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.tablet} {
    width: 140px;
  }
  @media ${({ theme }) => theme.breakPoint.mobile} {
    width: 80px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
`
const Wrapper = styled.div<{ isTarget: boolean }>`
  @media ${({ theme }) => theme.breakPoint.mobile} {
    width: 58px;
    height: 58px;
    font-size: 14px;
    font-weight: 500;
  }
  @media ${({ theme }) => theme.breakPoint.tablet} {
    width: 64px;
    height: 64px;
    font-size: 14px;
    font-weight: 500;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;

  background-color: #e4e4e4;
  width: 72px;
  height: 72px;
  border-radius: 50%;

  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isTarget ? props.theme.colors.blue : '#252525')};
`
const Label = styled.div`
  @media ${({ theme }) => theme.breakPoint.mobile} {
    font-size: 12px;
  }
  font-size: 14px;
  font-weight: 500;
  color: #454545;
`

const Goal = ({ target, label }: IGoal) => {
  return (
    <Container>
      <Wrapper isTarget={label === '목표'}>
        <div>{target}</div>
      </Wrapper>
      <Label>{label}</Label>
    </Container>
  )
}

export default Goal
