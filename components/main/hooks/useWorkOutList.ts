import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'
import {
  getExerciseData,
  writeExerciseData,
} from '../../../firebase/database/calender'
import {
  authLoading,
  userInfo,
  exerciseDataList,
} from '../../../utils/recoil/ExercisesState'
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

const fetchData = (
  userEmail: string,
  year: string,
  month: string,
  day: string,
  setList: Function,
) => {
  return getExerciseData(userEmail, year, month, day).then((res: any) => {
    const temp = []
    for (let key in res) temp.push(res[key])
    setList(temp)
    return temp
  })
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

    if (user.email.length > 0) {
      writeExerciseData(user.email, new Date(), data)
      return
    }
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
