import {
  getDateString,
  getKoreaDateString,
  initCalender,
} from '../../../utils/calender'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { userInfo } from '../../../recoil/ExercisesState'
import { useEffect, useState } from 'react'
import { IWorkOutFormDataList } from '../../../utils/types/exercise'
import { getExerciseData } from '../../../firebase/database/calender'

interface temp {
  exerciseData: any
  dietData: never[]
}

export const useCalenders = (
  year: string = new Date().getFullYear().toString(),
  month: string = String(new Date().getMonth() + 1),
) => {
  const [user, setUser] = useRecoilState(userInfo)
  const fallback: any = []

  // 이번달 가져오기
  const { data = fallback, isLoading } = useQuery(
    ['userAllData', 'exercises', year, month],
    () => getExerciseData(user.email, year, month),
    {
      enabled: user.email !== '',
    },
  )

  return { data, isLoading }
}
// 클릭하면 현재 주소를 바꾼다.

export const useCalenderFeature = (calenderList: number[][]) => {
  const [currentCalenderList, setCurrentCalenderList] = useState({
    calenderList,
    year: new Date().getFullYear(),
    month: new Date().toLocaleDateString('en-US', { month: 'long' }),
    date: new Date(),
  })
  const [counter, setCounter] = useState(0)

  const { data, isLoading } = useCalenders(
    currentCalenderList.date.getFullYear().toString(),
    String(currentCalenderList.date.getMonth() + 1),
  ) // year, month 보내줘야함.

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
    const strCurDate = getKoreaDateString(curDate || null)

    const res: IWorkOutFormDataList[] = []

    for (let key in data) {
      const monthItem = data[key]
      for (let k in monthItem) {
        if (!monthItem[k].id) continue
        const prevDate = new Date(monthItem[k].id)

        const strPrevDate = getKoreaDateString(prevDate)
        if (res.length < 4 && strCurDate === strPrevDate) res.push(monthItem[k])
      }
    }

    return res
  }

  return {
    currentCalenderList,
    updateCalenderList,
    resetCalenderList,
    isToday,
    findTies,
    data,
    isLoading,
  }
}
