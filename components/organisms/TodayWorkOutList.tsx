import React, { useState } from 'react'
import WorkOutItem from '../atoms/WorkOutItem'
import WorkOutTempItem from '../atoms/WorkOutTempItem'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { exercisesState } from '../../utils/recoil/ExercisesState'
import { tempState } from '../../pages/_app'

const Container = styled.section`
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  border: 0;
  border-radius: 8px;
  width: 240px;

  /* 뉴몰피즘 */
  background-color: #eee;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    6px 6px 10px rgba(0, 0, 0, 0.15);
`
const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 8px;
`
const Title = styled.div`
  font-size: 14px;
  color: #454545;
  font-weight: 500;
`
const PlusButton = styled.button`
  display: flex;
  border: 0;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: black;
  font-size: 16px;

  background-color: #eee;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    6px 6px 10px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  &:active {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
`
export type listProps = {
  index?: number
  targetBody: string
  exercise: string
  setTimes: string
}

const data2 = {
  targetBody: 'string',
  exercise: 'string',
  setTimes: '5',
}

const TodayWorkOutList = () => {
  const [a, setA] = useRecoilState(tempState)
  const [list, setList] = useState<listProps[]>([])
  const [tempList, setTempList] = useState<listProps[]>([])

  const addList = (data: listProps) => {
    setList((prev) => {
      const temp = [...prev]
      temp.push(data)
      return temp
    })
  }

  const addTempList = () => {
    setTempList((prev) => {
      const temp = [...prev]
      temp.push(data2)
      return temp
    })
  }
  const removeTempList = (i: number) => {
    setTempList((prev) => {
      const temp = [...prev]
      temp.splice(i, 1)
      return temp
    })
  }

  return (
    <Container>
      <TitleWrapper>
        <Title>오늘의 운동</Title>
      </TitleWrapper>

      {list.map((li, i) => (
        <WorkOutItem
          key={li.exercise}
          targetBody={li.targetBody}
          exercise={li.exercise}
          setTimes={li.setTimes}
        />
      ))}

      {tempList.map((li, i) => (
        <div key={i}>
          <WorkOutTempItem
            index={i}
            add={addList}
            remove={removeTempList}
            allData={a}
            {...li}
          />
        </div>
      ))}

      <PlusButton onClick={() => addTempList()}>+</PlusButton>
    </Container>
  )
}

export default TodayWorkOutList
