import { useEffect, useState } from 'react'
interface IDay {
  day: string
  month: string
  thisMonth: boolean
  isToday: boolean
  isFocus: boolean
  data: []
}
interface IMonth {
  month: string
  year: string
  days: IDay[][]
  totalTime?: number
}
export interface ICalender {
  calender: IDay[][]
}

export const useCalender = () => {
  const [curMonth, setCurMonth] = useState()
  const [curYear, setCurYear] = useState()

  const initCalender = (curDate: any = new Date()) => {
    const date = new Date(curDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthLastDate = new Date(year, month, 0).getDate()
    const monthStartDay = new Date(year, month, 1).getDay()
    const monthWeekCount = Math.ceil((monthStartDay + monthLastDate) / 7)

    const prevMonthLastDate = new Date(year, month, 0).getDate()
    const nextMonthStartDay = new Date(year, month + 1, 1).getDay()

    const dateList: IDay[][] = Array.from({ length: monthWeekCount }, () =>
      new Array(7).fill(undefined),
    )

    const prevDateList = _getPrevCalenderArr(
      monthStartDay,
      prevMonthLastDate,
      month - 1,
    )
    const nextDateList = _getNextCalenderArr(nextMonthStartDay, month + 1)
    dateList[0] = prevDateList
    dateList[dateList.length - 1] = nextDateList

    let count = 1
    dateList.forEach((arr, weeks) =>
      arr.forEach((item, days) => {
        if (dateList[weeks][days] === undefined) {
          dateList[weeks][days] = {
            day: count.toString(),
            isFocus: false,
            isToday: false,
            month: (month + 1).toString(),
            thisMonth: true,
            data: [],
          }
          count += 1
        }
      }),
    )
    return dateList
  }

  return { initCalender }
}

const _getPrevCalenderArr = (days: number, endDate: number, month: number) => {
  const res: IDay[] = Array.from({ length: 7 })
  const startDate = endDate - days + 1
  let j = 0
  for (let i = startDate; i <= endDate; i++) {
    ;(res[j] = {
      day: i.toString(),
      isFocus: false,
      isToday: false,
      month: (month + 1).toString(),
      thisMonth: false,
      data: [],
    }),
      (j += 1)
  }
  return res
}

const _getNextCalenderArr = (days: number, month: number) => {
  const res: IDay[] = Array.from({ length: 7 })
  if (days === 0) return res
  let j = 1
  for (let i = days; i < 7; i++) {
    ;(res[i] = {
      day: j.toString(),
      isFocus: false,
      isToday: false,
      month: (month + 1).toString(),
      thisMonth: false,
      data: [],
    }),
      j++
  }
  return res
}
