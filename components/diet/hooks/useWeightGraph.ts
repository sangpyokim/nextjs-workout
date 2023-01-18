import { getKoreaDateString } from './../../../utils/calender'
import React, { useEffect } from 'react'

export const useWeightGraph = () => {
  const getDateDiff = (d1: string, d2: string) => {
    const date1 = new Date(d1)
    const date2 = new Date(d2)

    const diffDate = date1.getTime() - date2.getTime()

    return Math.abs(diffDate / (1000 * 60 * 60 * 24)) // 밀리세컨 * 초 * 분 * 시 = 일
  }

  const getDayList = (start: string, end: string, diff: number) => {
    const dayList = [start]

    let count = 0
    const innerWidth = window.innerWidth
    if (innerWidth >= 1265) count = 7
    else if (innerWidth >= 768) count = 5
    else count = 3

    for (let i = 1; i <= count; i++) {
      const addDate = Math.floor((diff / count) * i)
      const oldDate = new Date(start)
      const newDate = new Date(oldDate.setDate(oldDate.getDate() + addDate))
      const str = getKoreaDateString(newDate)
      dayList.push(str)
    }
    return dayList
  }

  return {
    getDateDiff,
    getDayList,
  }
}
