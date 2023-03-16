import React from 'react'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import { IBarChart } from '../../interface'

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '시간별 통계',
    },
  },
}

const BarChart = ({ data }: IBarChart) => {
  return (
    <Container>
      <Bar
        data={{
          labels: data.labels,
          datasets: [data.data1, data.data2],
        }}
        options={options}
      />
    </Container>
  )
}

export default BarChart

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
