import {
  getDateString,
  getKoreaDateString,
  initCalender,
} from './../../../utils/calender'
import { useQuery, useIsFetching } from 'react-query'
import { getUserAllData } from '../../../utils/firebase/FireStore'
import { useRecoilState } from 'recoil'
import { userInfo } from '../../../utils/recoil/ExercisesState'
import { useState } from 'react'
import { ICalender, IWorkOutFormDataList } from '../../../utils/types/exercise'

interface temp {
  exerciseData: any
  dietData: never[]
}

export const useCalenders = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const fallback: any = []

  const { data = fallback, isLoading } = useQuery(
    ['userAllData'],
    () => {
      const curDate = getKoreaDateString(new Date())
      return getUserAllData(user.email.split('@')[0], curDate)
    },
    {
      enabled: user.email !== '',
      staleTime: 600000,
      cacheTime: 900000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  )

  return { data, isLoading }
}

export const useCalenderFeature = (calenderList: number[][], data: temp) => {
  const [currentCalenderList, setCurrentCalenderList] = useState({
    calenderList,
    year: new Date().getFullYear(),
    month: new Date().toLocaleDateString('en-US', { month: 'long' }),
    date: new Date(),
  })
  const [counter, setCounter] = useState(0)
  const updateCalenderList = (up: boolean) => {
    let temp = counter
    if (up) {
      temp += 1
    } else {
      temp -= 1
    }

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const newDate = new Date(year, month + temp)

    setCurrentCalenderList({
      calenderList: initCalender(getDateString(newDate)),
      year: newDate.getFullYear(),
      month: newDate.toLocaleDateString('en-US', { month: 'long' }),
      date: newDate,
    })
    setCounter(temp)
  }

  const resetCalenderList = () => {
    const date = new Date()
    setCurrentCalenderList({
      calenderList: initCalender(getDateString(date)),
      year: date.getFullYear(),
      month: date.toLocaleDateString('en-US', { month: 'long' }),
      date,
    })
  }

  const isToday = (date: number) => {
    const temp = new Date()

    return (
      temp.getFullYear() === currentCalenderList.year &&
      temp.toLocaleDateString('en-US', { month: 'long' }) ===
        currentCalenderList.month &&
      temp.getDate() === date
    )
  }

  const findTies = (date: number) => {
    const curDate = new Date(
      currentCalenderList.date.getFullYear(),
      currentCalenderList.date.getMonth(),
      date,
    )
    const strCurDate = getKoreaDateString(curDate)

    const res: IWorkOutFormDataList[] = []
    for (let x of data.exerciseData) {
      const prevDate = new Date(x.id)
      const strPrevDate = getKoreaDateString(prevDate)
      if (res.length < 4 && strCurDate === strPrevDate) res.push(x)
    }

    return res
  }

  return {
    currentCalenderList,
    updateCalenderList,
    resetCalenderList,
    isToday,
    findTies,
  }
}
