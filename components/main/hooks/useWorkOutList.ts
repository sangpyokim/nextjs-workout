import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { writeExerciseData } from '../../../firebase/database/calender'
import {
  authLoading,
  userInfo,
  exerciseDataList,
} from '../../../recoil/ExercisesState'
import {
  IExerciseList,
  IWorkOutFormDataList,
} from '../../../utils/types/exercise'

const data2 = {
  id: '',
  targetBody: '',
  exercise: '',
  setTimes: '',
}

const fetchData = async (
  userEmail: string,
  year: string,
  month: string,
  day: string,
  setList: Function,
) => {
  const url = `https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userEmail}/exercises/${year}/${month}/${day}.json`
  const fetchs = await fetch(url)
  const json = await fetchs.json()
  setList(json)
  return json
}

const useExerciseData = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [list, setList] = useState<IWorkOutFormDataList[]>([])

  const date = new Date()
  const year = date.getFullYear().toString()
  const month = String(date.getMonth() + 1)
  const day = date.getDate().toString()

  const { data = [], isLoading } = useQuery(
    ['userAllData', 'exercises', year, month],
    () => fetchData(user.email.split('.')[0], year, month, day, setList),
    {
      enabled: user.email !== '',
    },
  )
  return { list, setList, isLoading }
}

export const useWorkOutList = () => {
  const { list, setList, isLoading } = useExerciseData()
  const [tempList, setTempList] = useState<IWorkOutFormDataList[]>([])

  const [loading, setLoading] = useRecoilState(authLoading)
  const [user, setUser] = useRecoilState(userInfo)
  const [exerciseList, setExerciseList] =
    useRecoilState<IExerciseList[]>(exerciseDataList)

  const addList = async (data: IWorkOutFormDataList) => {
    setList((prev) => {
      const temp = [...prev]
      temp.push(data)
      return temp
    })

    if (user.email.length === 0) return

    writeExerciseData(user.email, new Date(), data)
  }

  const addTempList = () => {
    setTempList((prev) => {
      const temp = [...prev]
      temp.push(data2)
      return temp
    })
  }

  const removeTempList = (i: number) => {
    setTempList((prev) => {
      const temp = [...prev]
      temp.splice(i, 1)
      return temp
    })
  }

  return {
    list,
    tempList,
    exerciseList,
    addList,
    addTempList,
    removeTempList,
    isLoading: loading && isLoading,
  }
}
