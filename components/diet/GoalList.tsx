import React from 'react'
import styled from 'styled-components'
import Goal from './Goal'
import { useWeightGraph } from './hooks/useWeightGraph'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`

const GoalList = () => {
  const { data } = useWeightGraph()
  return (
    <Container>
      <Goal
        target={data.goal}
        label={'목표'}
      />
      <Goal
        target={data.targetWeight}
        label={'목표 체중'}
      />
      <Goal
        target={data.period}
        label={'목표 기간'}
      />
      <Goal
        target={data.everyWeek}
        label={'매주 목표'}
      />
    </Container>
  )
}

export default GoalList
