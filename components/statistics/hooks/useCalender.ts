import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { userInfo } from '../../../recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import { getTimeLine } from '../../../firebase/database/newDatabase'
import { useRouter } from 'next/router'

export interface IObj {
  time: string
  title: string
  type: string
}

export interface IDay {
  day: string
  month: string
  thisMonth: boolean
  isToday: boolean
  isFocus: boolean
  data: any[][] | null
}
interface IMonth {
  month: string
  year: string
  days: IDay[][]
  totalTime?: number
}
export interface ICalender {
  curYear: string
  curMonth: string
  calender: IDay[][]
  selectedDate: IDay
  setSelectedDate: Function
  isLoading: boolean
  onClickPrevMonth: Function
  onClickNextMonth: Function
}

export const useCalender = () => {
  const router = useRouter()
  const [user, _] = useRecoilState(userInfo)

  const [curDate, setCurDate] = useState(new Date().getDate())
  const [curMonth, setCurMonth] = useState(new Date().getMonth() + 1)
  const [curYear, setCurYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<IDay>()

  // -------------------- 할일
  // 총 공부시간 계산하기

  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery(
    [router.query.id, curYear, curMonth],
    async () => {
      const res = await getTimeLine(
        String(router.query.id),
        curYear.toString(),
        curMonth.toString(),
      )
      return _initCalender(
        res,
        setSelectedDate,
        new Date(`${curYear}/${curMonth}/${curDate}`),
      )
    },
    {
      enabled: user.email !== '',
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  const onClickPrevMonth = () => {
    const newDate = new Date(`${curYear}/${curMonth - 1}/${curDate}`)
    setCurYear(newDate.getFullYear())
    setCurMonth(newDate.getMonth() + 1)
  }
  const onClickNextMonth = () => {
    const newDate = new Date(`${curYear}/${curMonth + 1}/${curDate}`)
    setCurYear(newDate.getFullYear())
    setCurMonth(newDate.getMonth() + 1)
  }

  // 로그인안해도 사용할 수 있게...?
  return {
    curYear,
    curMonth,
    curDate,
    setCurYear,
    setCurMonth,
    setCurDate,
    selectedDate,
    setSelectedDate,
    data,
    isLoading: user.email === '' || isLoading,
    isFetching,
    onClickPrevMonth,
    onClickNextMonth,
  }
}

const _initCalender = (
  d: any,
  setSelectedDate: Function,
  curDate: any = new Date(),
) => {
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
      if (!dateList[weeks][days]) {
        dateList[weeks][days] = {
          day: count.toString(),
          isFocus: false,
          isToday:
            count === date.getDate() &&
            new Date().getMonth() === date.getMonth(),
          month: (month + 1).toString(),
          thisMonth: true,
          data:
            d && d[count] ? _orderToTimeZone(Object.values(d[count])) : null,
        }
        if (dateList[weeks][days].isToday)
          setSelectedDate(dateList[weeks][days])
        count += 1
      }
    }),
  )
  return dateList
}
const _orderToTimeZone = (d: IObj[] = []) => {
  const res = Array.from({ length: 24 }, () => new Array())
  for (let obj of d) {
    const index = Number(obj.time.slice(11, 13))
    res[index].push(obj)
  }

  return res
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
      data: null,
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
      data: null,
    }),
      j++
  }
  return res
}
