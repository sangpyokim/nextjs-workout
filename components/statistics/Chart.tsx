import { IChart } from '../../interface'
import styled from 'styled-components'
import PieChart from './PieChart'
import BarChart from './BarChart'

const Chart = ({ pieData, barData }: IChart) => {
  if (!pieData || !barData) return <Container></Container>

  return (
    <Container>
      <PieChart data={pieData} />
      <BarChart data={barData} />
    </Container>
  )
}

export default Chart

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  width: 100%;
  min-height: 20rem;
  margin-bottom: 1rem;

  @media ${(props) => props.theme.breakPoint.mobile} {
    grid-template-columns: 1fr;
    min-height: 40rem;
  }
`
