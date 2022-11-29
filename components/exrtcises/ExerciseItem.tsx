import Image from 'next/image'
import React from 'react'
import { IExerciseItem } from '../../utils/types/exercise'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 300px;
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
      />

      <h2>{name}</h2>

      <div>{bodyPart}</div>
      <div>{equipment}</div>
      <div>{target}</div>
    </Container>
  )
}

export default ExerciseItem
