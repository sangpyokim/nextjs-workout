import Image from 'next/image'
import React from 'react'
import { IExerciseItem } from '../../utils/types/exercise'
import styled from 'styled-components'

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.mobile} {
    font-size: 14px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
`

const ExerciseItem = ({
  id,
  bodyPart,
  equipment,
  gifUrl,
  name,
  target,
}: IExerciseItem) => {
  return (
    <Container>
      <Image
        src={gifUrl}
        width={'80'}
        height={'80'}
        alt={name}
        priority={true}
      />

      <h2>{name}</h2>

      <div>{bodyPart}</div>
      <div>{equipment}</div>
      <div>{target}</div>
    </Container>
  )
}

export default ExerciseItem
