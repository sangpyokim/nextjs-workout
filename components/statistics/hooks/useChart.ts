import React, { useEffect, useState } from 'react'
import {
  IBarChartData,
  IBarChartDataFunc,
  IChartDataSets,
  INewDay,
  IPieChartData,
  IPieChartDataFunc,
} from '../../../interface'
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

const useChart = (selectedDate: INewDay | undefined) => {
  const [pieData, setPieData] = useState<IPieChartData>()
  const [barData, setBarData] = useState<IBarChartData>()

  const pieChartData: IPieChartDataFunc = (selectedDate: INewDay) => {
    if (!selectedDate || !selectedDate.data) return

    const map = new Map()

    for (let arr of selectedDate.data) {
      for (let item of arr) {
        map.set(item.title, map.get(item.title) + 1 || 1)
      }
    }

    const label: string[] = []
    const data: number[] = []
    let count = 0

    map.forEach((val, key) => {
      label.push(key)
      data.push(val)
      count += val
    })

    return {
      label,
      data,
      count,
    }
  }
  const barChartData: IBarChartDataFunc = (selectedDate: INewDay) => {
    if (!selectedDate || !selectedDate.data) return
    const labels = ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12']

    const morning: IChartDataSets = {
      label: '오전',
      backgroundColor: '#ffe58f',
      data: new Array(13).fill(0),
    }
    const afternoon: IChartDataSets = {
      label: '오후',
      backgroundColor: '#91caff',
      data: new Array(13).fill(0),
    }

    for (let arr of selectedDate.data) {
      for (let item of arr) {
        const a = item.time.slice(8, 10)
        const time = +item.time.slice(11, 13)
        const b = time >>> 1

        if (a === '오전') {
          morning.data[b] += 1
        } else {
          afternoon.data[b] += 1
        }
      }
    }

    return {
      labels,
      data1: morning,
      data2: afternoon,
    }
  }

  useEffect(() => {
    if (!selectedDate) return

    const res1 = pieChartData(selectedDate)
    const res2 = barChartData(selectedDate)
    setPieData(res1)
    setBarData(res2)
  }, [selectedDate])

  return {
    pieData,
    barData,
  }
}

export default useChart
