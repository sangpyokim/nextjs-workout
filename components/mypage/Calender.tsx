import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LeftOutlined, RedoOutlined, RightOutlined } from '@ant-design/icons'

import { bodyPartColors, ICalender } from '../../utils/types/exercise'
import { useRecoilState } from 'recoil'
import { authLoading, curFocusDay, userInfo } from '../../recoil/ExercisesState'
import { CalenderMaker, Day } from '../../utils/calender'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'

const Container = styled.div`
  max-width: 320px;
  width: 100%;
  height: fit-content;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 8px;
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  width: 100%;
  height: 34px;
`
const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Month = styled.div`
  font-size: 14px;
  margin-right: 4px;
`
const Year = styled.div`
  font-size: 18px;
  font-weight: 600;
`
const IconContainer = styled.div`
  display: flex;
`
const IconWrapper = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`

const DaysGridContainer = styled.div`
  height: 200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
`
const DaysColumnsWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
`
const DaysItem = styled.div<{ isThisMonth: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    cursor: ${(props) => (props.isThisMonth ? 'pointer' : 'null')};
  }
`
const Days = styled.div<{
  curFocus: () => string
  existDietData: () => string
  isThisMonth: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  background-color: ${(props) => props.existDietData()};
  color: ${(props) => props.curFocus()};
  width: 50%;
  font-size: 12px;
  font-weight: ${(props) => (props.isThisMonth ? '500' : '400')};
`
const TiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 20px;
  padding: 0 2px;
`
const Ties = styled.div<{ bodyPart: string }>`
  width: 100%;
  height: 3px;
  background-color: ${(props) => bodyPartColors[props.bodyPart]};
  margin-bottom: 2px;
`
const getDiet = async (userEmail: string, year: number, month: number) => {
  const url = `https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userEmail}/diet/${year}/${month}.json`
  const res = (await axios.get(url)) || []
  const data: any[] = []

  for (let key in res.data) {
    data[Number(key)] = res.data[key]
  }
  return data
}
const getExercise = async (userEmail: string, year: number, month: number) => {
  const url = `https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userEmail}/exercises/${year}/${month}.json`
  const res = (await axios.get(url)) || []
  const data: any[] = []

  for (let key in res.data) {
    data[Number(key)] = res.data[key]
  }
  return data
}

const Calender = ({ calenderMaker }: ICalender) => {
  const [user, _] = useRecoilState(userInfo)
  const [curFocus, setCurFocus] = useRecoilState(curFocusDay)
  const [key, setKey] = useState(-1)

  const { data: dietData = [], isLoading: dietLoading } = useQuery(
    [
      'userAllData',
      'diet',
      calenderMaker.year + '',
      calenderMaker.month + 1 + '',
    ],
    () =>
      getDiet(
        user.email.split('.')[0],
        calenderMaker.year,
        calenderMaker.month + 1,
      ),
    {
      enabled: user.email !== '',
    },
  )
  const { data: exerciseData = [], isLoading: exerciseLoading } = useQuery(
    [
      'userAllData',
      'exercises',
      calenderMaker.year + '',
      calenderMaker.month + 1 + '',
    ],
    () =>
      getExercise(
        user.email.split('.')[0],
        calenderMaker.year,
        calenderMaker.month + 1,
      ),
    {
      enabled: user.email !== '',
    },
  )
  if (!dietLoading && !exerciseLoading) {
    calenderMaker.setList(0, exerciseData, dietData)
  }

  const resetCalenderList = () => {
    calenderMaker.init(new Date())
    setKey(key + 1)
  }
  const updateCalenderList = (divider: -1 | 0 | 1 = 0) => {
    calenderMaker.setList(divider)
    setKey(key + 1)
  }
  const onClick = (day: Day) => {
    calenderMaker.curFocus = day.day
    setKey(key + 1)
    setCurFocus(day)
  }

  const daysBackGroundColor = (day: Day) => {
    if (day.isToday) return '#333333'
    if (calenderMaker.curFocus === day.day && day.isThisMonth) return '#85a5ff'
    if (day.dietData.length > 0) return '#ffd591'
    if (day.isThisMonth) return '#e8e8e8'
    return '#f8f8f8'
  }
  const daysColor = (day: Day) => {
    if (day.isToday) return '#f2f2f2'
    if (!day.isThisMonth) return '#ccc'
    if (calenderMaker.curFocus === day.day || day.dietData.length > 0)
      return '#fff'

    return '#252525'
  }
  return (
    <Container>
      <TitleContainer>
        <TimeContainer>
          <Month>{calenderMaker.monthString}</Month>
          <Year>{calenderMaker.year}</Year>
        </TimeContainer>
        <IconContainer>
          <IconWrapper onClick={() => resetCalenderList()}>
            <RedoOutlined style={{ fontSize: '12px' }} />
          </IconWrapper>
          <IconWrapper onClick={() => updateCalenderList(-1)}>
            <LeftOutlined style={{ fontSize: '12px' }} />
          </IconWrapper>
          <IconWrapper onClick={() => updateCalenderList(1)}>
            <RightOutlined style={{ fontSize: '12px' }} />
          </IconWrapper>
        </IconContainer>
      </TitleContainer>

      <DaysGridContainer>
        {calenderMaker.getList().map((arr, i) => (
          <DaysColumnsWrapper key={i}>
            {arr.map((day, j) => (
              <DaysItem
                isThisMonth={day.isThisMonth}
                key={day.day}
                onClick={() => (day.isThisMonth ? onClick(day) : -1)}
              >
                <Days
                  curFocus={() => daysColor(day)}
                  existDietData={() => daysBackGroundColor(day)}
                  isThisMonth={day.isThisMonth}
                >
                  {day.day}
                </Days>
                <TiesWrapper>
                  {day.exerciseTag &&
                    [...new Set(day.exerciseTag.map((l) => l.targetBody))].map(
                      (tag) => (
                        <Ties
                          key={tag}
                          bodyPart={tag}
                        />
                      ),
                    )}
                </TiesWrapper>
              </DaysItem>
            ))}
          </DaysColumnsWrapper>
        ))}
      </DaysGridContainer>
    </Container>
  )
}

export default Calender
