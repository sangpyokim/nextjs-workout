import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'
import { INewDay } from '../../interface'
import styled from 'styled-components'
import DoughnutChart from './DoughnutChart'
import BarChart from './BarChart'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
  Title,
  Tooltip,
  Legend,
)

interface IChart {
  selectedDate: INewDay
  doughnutChartData: any
}
export interface IDoughnutChartData {
  label: string[]
  data: number[]
  count: number
}

const Chart = ({ selectedDate, doughnutChartData }: IChart) => {
  const [doughnutData, setDoughnutData] = useState<IDoughnutChartData>()

  useEffect(() => {
    const res = doughnutChartData(selectedDate)
    setDoughnutData(res)
  }, [selectedDate])

  if (!doughnutData) return <div></div>

  return (
    <Container>
      <DoughnutChart data={doughnutData} />
      <BarChart />
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
  }
`
