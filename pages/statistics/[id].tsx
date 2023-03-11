import styled from 'styled-components'
import Calender from '../../components/statistics/Calender'
import { useCalender } from '../../components/statistics/hooks/useCalender'
import TimeLine from '../../components/statistics/TimeLine'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

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
      {selectedDate && selectedDate.data && selectedDate.data!.length > 0 && (
        <>
          <TimeLine selectedDate={selectedDate} />
        </>
      )}
    </Container>
  )
}

export default _
