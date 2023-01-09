import React, { useCallback, useReducer, useState } from 'react'
import styled from 'styled-components'
import Timer from './Timer'
import TimerQuickSlot from './TimerQuickSlot'

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    display: flex;
  }
  @media ${({ theme }) => theme.breakPoint.tablet} {
    display: flex;
  }
  padding-bottom: 20px;
`
const TimerWrapper = () => {
  return (
    <Container>
      <Timer />
      <TimerQuickSlot />
    </Container>
  )
}

export default TimerWrapper
