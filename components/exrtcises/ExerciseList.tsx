import React, { useEffect, useState } from 'react'
import ExerciseItem from './ExerciseItem'

import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { exerciseDataList } from '../../recoil/ExercisesState'

import { getExercises } from '../../pages/api/exercises'
import { IExerciseItem } from '../../utils/types/exercise'

const Container = styled.div`
  width: 100%;
`
const ExerciseContainer = styled.div`
  width: 100%;
`
const Details = styled.details``
const Tag = styled.summary`
  font-size: 20px;
  height: 40px;
`

const ExerciseList = () => {
  const [items, setItems] = useRecoilState(exerciseDataList)
  const [category, setCategory] = useState<any>({
    하체: [],
    등: [],
    가슴: [],
    어깨: [],
    팔: [],
    복근: [],
  })

  const router = useRouter()

  useEffect(() => {
    if (items[0].bodyPart.length === 0) {
      ;(async () => {
        const res = await getExercises()
        const obj = { ...category }
        for (let item of res) {
          obj[item.bodyPart].push(item)
        }
        setCategory(obj)
      })()
    } else {
      const obj = { ...category }
      for (let item of items) {
        obj[item.bodyPart].push(item)
      }
      setCategory(obj)
    }
  }, [exerciseDataList])

  if (items[0].bodyPart.length === 0) return <div>loading</div>

  return (
    <Container>
      <div>운동 부위별 학습하기</div>
      {Object.keys(category).map((c) => (
        <ExerciseContainer key={c}>
          {/* {console.log(category[c])} */}
          <Details>
            <Tag>{c}</Tag>
            {category[c].map((item: IExerciseItem, i: number) => (
              <Link
                key={i}
                href={{
                  pathname: `/learn/[slug]`,
                  query: { slug: item.id },
                }}
              >
                <ExerciseItem
                  {...item}
                  key={i}
                />
              </Link>
            ))}
          </Details>
        </ExerciseContainer>
      ))}
    </Container>
  )
}

export default ExerciseList
