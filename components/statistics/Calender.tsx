import { map } from '@firebase/util'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ICalender } from '../../interface'
import CalenderSkeleton from './CalenderSkeleton'

const Calender = ({
  curDate,
  calender,
  selectedDate,
  setSelectedDate,
  isLoading,
  onClickPrevMonth,
  onClickNextMonth,
}: ICalender) => {
  return (
    <Container>
      <Header>
        <Button onClick={() => onClickPrevMonth()}>〈</Button>
        <CurDate>{`${curDate.getFullYear()}. ${
          curDate.getMonth() + 1
        }`}</CurDate>
        <Button onClick={() => onClickNextMonth()}>〉</Button>
      </Header>
      <Date>
        {['일', '월', '화', '수', '목', '금', '토'].map((item: string) => (
          <DateItem key={item}>{item}</DateItem>
        ))}
      </Date>

      {isLoading ? (
        <CalenderSkeleton />
      ) : (
        <Grid>
          {calender.map((arr, i) =>
            arr.map((item, j) => (
              <Item
                key={j}
                onClick={() => setSelectedDate(item)}
                thisMonth={item.thisMonth}
                isData={!!item.data && item.data.length > 0}
                isFocus={
                  item.day === selectedDate?.day &&
                  item.month === selectedDate?.month
                }
              >
                <ItemDate isToday={item.isToday}>{item.day}</ItemDate>
              </Item>
            )),
          )}
        </Grid>
      )}
    </Container>
  )
}

export default Calender

const Container = styled.div`
  font-size: ${(props) => props.theme.fontSize.font_base};
  line-height: ${(props) => props.theme.lineHeight.font_base};
  color: var(--text-color);
  width: 100%;
  background-color: var(--header-bg);
  margin-bottom: 1rem;
  border-radius: 4px;
`
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`
const Date = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`
const DateItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.font_sm};
  line-height: ${(props) => props.theme.lineHeight.font_sm};
  font-weight: 500;
`
const Item = styled.div<{
  thisMonth: boolean
  isData: boolean
  isFocus: boolean
}>`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: ${(props) =>
    props.thisMonth ? 'var(--text-color)' : 'var(--text-sub-color)'};
  background-color: ${(props) =>
    props.isData ? 'var(--color-btn-bg-hover)' : ''};

  border: 1px solid;

  border-color: ${(props) =>
    props.isFocus ? 'var(--color-btn-border-hover)' : 'var(--border-color)'};

  border-radius: 2px;
  &:hover {
    cursor: pointer;
  }
`

const ItemDate = styled.div<{ isToday: boolean }>`
  color: ${(props) => (props.isToday ? 'black' : '')};
  background-color: ${(props) => (props.isToday ? 'var(--text-color)' : '')};
  padding: 0px 4px;
  border-radius: 2px;
`
const Header = styled.div`
  color: var(--text-color);
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSize.font_xxl};
  line-height: ${(props) => props.theme.lineHeight.font_xxl};
  padding: 8px 16px;
`
const CurDate = styled.div`
  display: flex;
  margin: 0 16px;
`
const Button = styled.div`
  font-size: ${(props) => props.theme.fontSize.font_xl};
  line-height: ${(props) => props.theme.lineHeight.font_xxl};
  font-weight: 800;
  &:hover {
    cursor: pointer;
  }
`
