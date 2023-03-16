import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import styled from 'styled-components'

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

const data = {
  labels: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12'],
  datasets: [
    {
      label: '오전',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [1, 2, 3, 4, 2, 1],
    },
    {
      label: '오후',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [4, 3, 2, 1, 3, 5],
    },
  ],
}

const BarChart = () => {
  return (
    <Container>
      <Bar
        data={data}
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
