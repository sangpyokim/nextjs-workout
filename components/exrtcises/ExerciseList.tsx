import React, { useState } from 'react'
import { IExerciseItem } from '../../utils/types/exercise'
import ExerciseItem from './ExerciseItem'

import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { tempState } from '../../pages/_app'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(33%, auto));
  width: 100%;
`

const ExerciseList = () => {
  const [items, setItems] = useRecoilState(tempState)
  console.log(items)
  const router = useRouter()

  if (!items.length) return <div>loading</div>

  return (
    <Container>
      {items.map((item) => (
        <Link
          key={item.id}
          href={`${router.pathname}/${item.id}`}
        >
          <ExerciseItem {...item} />
        </Link>
      ))}
    </Container>
  )
}

export default ExerciseList
