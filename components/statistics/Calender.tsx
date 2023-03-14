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
          {calender.map((arr, i) => (
            <Rows key={i}>
              {arr.map((item, j) => (
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
              ))}
            </Rows>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default Calender

const Container = styled.div`
  color: var(--text-color);
  width: 100%;
  background-color: var(--header-bg);
  margin-bottom: 1rem;
  border-radius: 4px;
`
const Grid = styled.div`
  width: 100%;
  display: grid;
`
const Date = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-evenly;
  /* border-bottom: 1px solid white; */
  /* margin-bottom: 2rem; */
`
const DateItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
`
const Rows = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
`
const Item = styled.div<{
  thisMonth: boolean
  isData: boolean
  isFocus: boolean
}>`
  width: 100%;
  height: 8rem;
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
  @media ${(props) => props.theme.breakPoint.mobile} {
    height: 6rem;
  }
`
const ItemDate = styled.div<{ isToday: boolean }>`
  color: ${(props) => (props.isToday ? 'black' : '')};
  background-color: ${(props) => (props.isToday ? 'var(--text-color)' : '')};
  padding: 2px 4px;
  border-radius: 2px;
`
const Header = styled.div`
  color: var(--text-color);
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 8px 16px;
`
const CurDate = styled.div`
  display: flex;
  margin: 0 16px;
`
const Button = styled.div`
  font-size: 1.5rem;
  &:hover {
    cursor: pointer;
  }
`
