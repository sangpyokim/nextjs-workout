import React from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
`
const Bar = styled.div`
  height: 2rem;
  width: 0.5rem;
  background-color: white;
  margin-right: 2px;
`
const move = keyframes`
  25% {
    
  }
  50% {

  }
  75% {}
`

// 상태: 준비: 선택된 상태, 진행, 멈춤, 끝
export const ProcessIcon = () => {
  return (
    <Container>
      <Bar />
      <Bar />
      <Bar />
      <Bar />
    </Container>
  )
}
