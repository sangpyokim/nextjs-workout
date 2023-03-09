import { GetServerSideProps } from 'next'
import React from 'react'
import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
import Calender from '../../components/statistics/Calender'
import { useCalender } from '../../components/statistics/hooks/useCalender'
import TimeLine from '../../components/statistics/TimeLine'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()

  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
    },
  }
}

const _ = () => {
  const {
    curYear,
    curMonth,
    selectedDate,
    setSelectedDate,
    data,
    isLoading,
    onClickPrevMonth,
    onClickNextMonth,
  } = useCalender()
  return (
    <Container>
      <Calender
        onClickPrevMonth={onClickPrevMonth}
        onClickNextMonth={onClickNextMonth}
        curYear={String(curYear)}
        curMonth={String(curMonth)}
        calender={data}
        selectedDate={selectedDate!}
        setSelectedDate={setSelectedDate}
        isLoading={isLoading}
      />
      {selectedDate && selectedDate.data && selectedDate.data!.length > 0 && (
        <>
          <TimeLine selectedDate={selectedDate} />
        </>
      )}
    </Container>
  )
}

export default _
