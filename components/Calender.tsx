import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LeftOutlined, RedoOutlined, RightOutlined } from '@ant-design/icons'
import {
  getDateString,
  getKoreaDateString,
  initCalender,
} from '../utils/calender'
import {
  bodyPartColors,
  ICalender,
  IWorkOutFormDataList,
} from '../utils/types/exercise'

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

const Calender = ({ calenderList, data }: ICalender) => {
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
    const curDate = new Date(
      currentCalenderList.date.getFullYear(),
      currentCalenderList.date.getMonth(),
      date,
    )
    const strCurDate = getKoreaDateString(curDate)

    const res: IWorkOutFormDataList[] = []
    for (let x of data) {
      const prevDate = new Date(x.id)
      const strPrevDate = getKoreaDateString(prevDate)
      if (res.length < 4 && strCurDate === strPrevDate) res.push(x)
    }

    return res
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
                  {findTies(date).map((data) => (
                    <Ties
                      key={data.id}
                      bodyPart={data.targetBody}
                    />
                  ))}
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
