import React from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'
import styled from 'styled-components'
import { IDoughnutChartData } from './Chart'

interface IDoughnutChart {
  data: IDoughnutChartData
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: '시간별 통계',
    },
  },
}

const DoughnutChart = ({ data }: IDoughnutChart) => {
  return (
    <Container>
      <ChartWrapper>
        <Pie
          options={options}
          data={{
            labels: data.label,
            datasets: [
              {
                data: data.data,
              },
            ],
          }}
        />
      </ChartWrapper>

      <CharDescription>
        {data.label.map((label: string, i: number) => (
          <div key={label}>
            {label}:{data.data[i]} / {data.count}{' '}
            {((100 * data.data[i]) / data.count).toFixed(1)}%
          </div>
        ))}
      </CharDescription>
    </Container>
  )
}

export default DoughnutChart

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 20rem;

  background-color: var(--header-bg);
  border-radius: 4px;
  color: var(--text-color);

  padding: 8px;
`
const ChartWrapper = styled.div`
  max-width: 60%;
`
const CharDescription = styled.div``
