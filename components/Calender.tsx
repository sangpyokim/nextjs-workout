import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  LeftOutlined,
  OrderedListOutlined,
  RedoOutlined,
  RightOutlined,
} from '@ant-design/icons'
import { getDateString, initCalender } from '../utils/calender'

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
const DaysItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Days = styled.div<{ isToday: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  background-color: ${(props) => (props.isToday ? '#333333' : '#f2f2f2')};
  color: ${(props) => (props.isToday ? '#f2f2f2' : '#333333')};
  width: 50%;
  font-size: 12px;
  font-weight: 500;
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
  height: 4px;
  background-color: ${(props) => bodyPartColors[props.bodyPart]};
  margin-bottom: 2px;
`

// 캘린더 데이터가져오기
// 현재 캘린더에 적힌 월, 년 기준으로 달력 만들기 -> 버튼 누르면 캘린더 재 랜더링
// days -> background-color(이번달, 오늘), color(이번달, 이번달 x, 오늘)
// ties -> 운동에따른 지정색. 최대 4개

const bodyPartColors: IBodyPartColors = {
  가슴: '#69b1ff',
  등: '#b37feb',
}
interface IBodyPartColors {
  [key: string]: string
}

interface IDummyData {
  date: string
  workList: string[]
}

interface ICalender {
  calenderList: number[][]
  dummyData: IDummyData[]
}

const Calender = ({ calenderList, dummyData }: ICalender) => {
  const [currentCalenderList, setCurrentCalenderList] = useState({
    calenderList,
    year: new Date().getFullYear(),
    month: new Date().toLocaleDateString('en-US', { month: 'long' }),
    date: new Date(),
  })
  const [counter, setCounter] = useState(0)

  const updateCalenderList = (up: boolean) => {
    let temp = counter
    if (up) {
      temp += 1
    } else {
      temp -= 1
    }

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const newDate = new Date(year, month + temp)

    setCurrentCalenderList({
      calenderList: initCalender(getDateString(newDate)),
      year: newDate.getFullYear(),
      month: newDate.toLocaleDateString('en-US', { month: 'long' }),
      date: newDate,
    })
    setCounter(temp)
  }
  const resetCalenderList = () => {
    const date = new Date()
    setCurrentCalenderList({
      calenderList: initCalender(getDateString(date)),
      year: date.getFullYear(),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      date,
    })
  }
  const isToday = (date: number) => {
    const temp = new Date()

    return (
      temp.getFullYear() === currentCalenderList.year &&
      temp.toLocaleDateString('en-US', { month: 'long' }) ===
        currentCalenderList.month &&
      temp.getDate() === date
    )
  }
  const findTies = (date: number) => {
    const temp = new Date(
      currentCalenderList.date.getFullYear(),
      currentCalenderList.date.getMonth(),
      date,
    )
    const tempStr = getDateString(temp)

    return dummyData
      .filter((list) => list.date === tempStr)
      .map((list) => list.workList.sort())
  }

  return (
    <Container>
      <TitleContainer>
        <TimeContainer>
          <Month>{currentCalenderList.month}</Month>
          <Year>{currentCalenderList.year}</Year>
        </TimeContainer>
        <IconContainer>
          <IconWrapper onClick={() => resetCalenderList()}>
            <RedoOutlined style={{ fontSize: '12px' }} />
          </IconWrapper>
          <IconWrapper onClick={() => updateCalenderList(false)}>
            <LeftOutlined style={{ fontSize: '12px' }} />
          </IconWrapper>
          <IconWrapper onClick={() => updateCalenderList(true)}>
            <RightOutlined style={{ fontSize: '12px' }} />
          </IconWrapper>
        </IconContainer>
      </TitleContainer>

      <DaysGridContainer>
        {currentCalenderList.calenderList.map((list, i) => (
          <DaysColumnsWrapper key={i}>
            {list.map((date, i) => (
              <DaysItem key={i}>
                <Days isToday={isToday(date)}>{date}</Days>
                <TiesWrapper>
                  {findTies(date).map((list, i) =>
                    list.map((tie, i) => (
                      <Ties
                        key={i}
                        bodyPart={tie}
                      />
                    )),
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
