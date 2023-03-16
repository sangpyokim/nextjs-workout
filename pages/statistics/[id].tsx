import styled from 'styled-components'
import Calender from '../../components/statistics/Calender'
import Chart from '../../components/statistics/Chart'
import { useCalender } from '../../components/statistics/hooks/useCalender'
import useChart from '../../components/statistics/hooks/useChart'
import TimeLine from '../../components/statistics/TimeLine'

const _ = () => {
  const {
    newCurDate,
    selectedDate,
    setSelectedDate,
    data,
    isLoading,
    onClickPrevMonth,
    onClickNextMonth,
  } = useCalender()

  const { pieData, barData } = useChart(selectedDate)

  return (
    <Container>
      <Calender
        onClickPrevMonth={onClickPrevMonth}
        onClickNextMonth={onClickNextMonth}
        curDate={newCurDate}
        calender={data}
        selectedDate={selectedDate!}
        setSelectedDate={setSelectedDate}
        isLoading={isLoading}
      />

      <>
        <Chart
          pieData={pieData!}
          barData={barData!}
        />
        <TimeLine selectedDate={selectedDate} />
      </>
    </Container>
  )
}

export default _

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
