import React from 'react'
import WorkOutTempItem from '../atoms/WorkOutTempItem'
import styled from 'styled-components'

import WorkOutItem from '../atoms/WorkOutItem'

import { useWorkOutList } from './hooks/useWorkOutList'

const Container = styled.section`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    width: 460px;
  }
  @media ${({ theme }) => theme.breakPoint.tablet} {
    width: 400px;
  }

  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  border: 0;
  border-radius: 8px;
  width: 240px;
  min-height: 80px;

  /* 뉴몰피즘 */
  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
`
const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 8px;
`
const Title = styled.div`
  font-size: 14px;
  color: #252525;
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

  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};

  &:hover {
    box-shadow: ${({ theme }) => theme.neumorphism.hover.box_shadow};
  }
  &:active {
    box-shadow: ${({ theme }) => theme.neumorphism.active.box_shadow};
  }
`

const TodayWorkOutList = () => {
  const {
    list,
    tempList,
    exerciseList,
    addList,
    addTempList,
    removeTempList,
    isLoading,
  } = useWorkOutList()

  if (isLoading) return <Container></Container>

  return (
    <Container>
      <TitleWrapper>
        <Title>오늘의 운동</Title>
      </TitleWrapper>

      {list &&
        list.map((li, i) => (
          <WorkOutItem
            key={li.id}
            id={li.id}
            targetBody={li.targetBody}
            exercise={li.exercise}
            setTimes={li.setTimes}
          />
        ))}

      {tempList.map((_, i) => (
        <WorkOutTempItem
          key={i}
          index={i}
          addList={addList}
          remove={removeTempList}
          exerciseList={exerciseList}
        />
      ))}
      <PlusButton onClick={() => addTempList()}>+</PlusButton>
    </Container>
  )
}

export default TodayWorkOutList
