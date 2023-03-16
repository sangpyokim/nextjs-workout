import React from 'react'
import { INewDay } from '../../../interface'

const useChart = () => {
  const doughnutChartData = (a: INewDay) => {
    if (!a || !a.data) return

    const map = new Map()

    for (let arr of a.data) {
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
  return {
    doughnutChartData,
  }
}

export default useChart
