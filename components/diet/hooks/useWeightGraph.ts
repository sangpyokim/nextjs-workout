import { userInfo } from './../../../recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import { getKoreaDateString } from './../../../utils/calender'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'

export const fetchUserWeightGoalData = async (user: string) => {
  const url = `https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/users/${user}/weightGoal.json`

  const fetchData = await fetch(url)
  const json = await fetchData.json()
  return json
}

export const useWeightGraph = () => {
  const [user, _] = useRecoilState(userInfo)
  const [innerWidth, setInnerWidth] = useState(0)

  useEffect(() => {
    setInnerWidth(window.innerWidth)
  }, [])

  const { data = [] } = useQuery(
    ['weightGoal'],
    () => fetchUserWeightGoalData(user.email.split('.')[0]),
    {
      enabled: user.email.length !== 0,
    },
  )

  const getDateDiff = (d1?: string, d2?: string) => {
    if (!data.weightList || data.weightList.length === 0) return 0

    const d3 = d1 || data.startDate
    const d4 = d2 || data.endDate

    const date1 = new Date(d3)
    const date2 = new Date(d4)

    const diffDate = date1.getTime() - date2.getTime()

    return Math.abs(diffDate / (1000 * 60 * 60 * 24)) // 밀리세컨 * 초 * 분 * 시 = 일
  }
  const getDDay = () => {
    if (data.weightList === undefined || data.weightList.length === 0) return -1

    const d1 = data.endDate
    const d2 = getKoreaDateString(new Date())
    return getDateDiff(d1, d2)
  }
  const getDayList = () => {
    if (data.weightList === undefined || data.weightList.length === 0) return []
    const diff = getDateDiff()
    const start = data.startDate
    const dayList = [start]
    let count = 0

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

    const res = []
    for (let day of dayList) {
      const weight = similarDate(data.weightList, day)
      const obj = {
        date: day,
        weight: weight,
      }
      res.push(obj)
    }
    return res
  }

  function similarDate(arr: any, date1: string) {
    const d1 = new Date()
    const d2 = new Date(date1)

    if (d1.getTime() < d2.getTime()) return ''

    let min = Infinity
    let res = ''
    for (let day of arr) {
      const diff = getDateDiff(day.date, date1)
      if (min > diff) {
        min = diff
        res = day.weight
      }
    }
    return res
  }

  return {
    data,
    getDDay,
    getDayList,
  }
}
