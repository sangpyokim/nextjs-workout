import { useQuery } from 'react-query'
import { useState } from 'react'
import { userInfo } from '../../../recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import { getTimeLine } from '../../../firebase/database/newDatabase'
import { useRouter } from 'next/router'
import {
  IDay,
  INewDay,
  INewTimeLineItem,
  ITimeLineItem,
} from '../../../interface'

class ITimeLine implements IDay {
  day: number
  month: number
  isFocus: boolean
  isToday: boolean
  thisMonth: boolean
  data: ITimeLineItem[][] | null

  constructor(
    day: number,
    month: number,
    isToday: boolean,
    thisMonth: boolean,
    isFocus: boolean,
    data: ITimeLineItem[][] | null,
  ) {
    this.day = day
    this.month = month
    this.isToday = isToday
    this.thisMonth = thisMonth
    this.isFocus = isFocus
    this.data = data
  }
}

export const useCalender = () => {
  const router = useRouter()
  const [user, _] = useRecoilState(userInfo)

  const [curDate, setCurDate] = useState(new Date().getDate())
  const [curMonth, setCurMonth] = useState(new Date().getMonth() + 1)
  const [curYear, setCurYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState<INewDay>()

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
        const item = new ITimeLine(
          count,
          month + 1,
          count === date.getDate() && new Date().getMonth() === date.getMonth(),
          true,
          false,
          d && d[count] ? _orderToTimeZone(Object.values(d[count])) : null,
        )

        dateList[weeks][days] = item

        if (dateList[weeks][days].isToday)
          setSelectedDate(dateList[weeks][days])
        count += 1
      }
    }),
  )
  return dateList
}

const _orderToTimeZone = (d: ITimeLineItem[] = []) => {
  const res = Array.from({ length: 24 }, () => new Array())
  for (let obj of d) {
    const newDate = new Date(obj.time)
    const index = Number(newDate.getHours())
    const newTimeLineItem: INewTimeLineItem = Object.assign(obj, {
      showTime: _convertTimeToTwoDigit(newDate),
      time: _convertTime(newDate),
    })
    res[index].push(newTimeLineItem)
  }

  return res
}
const _convertTimeToTwoDigit = (date: Date) => {
  const convert = new Intl.DateTimeFormat('ko', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
  return convert
}
const _convertTime = (date: Date) => {
  const convert = new Intl.DateTimeFormat('ko', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
  return convert
}

const _getPrevCalenderArr = (days: number, endDate: number, month: number) => {
  const res: IDay[] = Array.from({ length: 7 })
  const startDate = endDate - days + 1
  let j = 0
  for (let i = startDate; i <= endDate; i++) {
    const item = new ITimeLine(i, month + 1, false, false, false, null)
    res[j] = item
    j += 1
  }
  return res
}

const _getNextCalenderArr = (days: number, month: number) => {
  const res: IDay[] = Array.from({ length: 7 })
  if (days === 0) return res
  let j = 1
  for (let i = days; i < 7; i++) {
    const item = new ITimeLine(j, month + 1, false, false, false, null)
    res[i] = item
    j += 1
  }
  return res
}
