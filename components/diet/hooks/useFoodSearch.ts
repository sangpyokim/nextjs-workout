import React, { FormEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { writeUserFoodList } from '../../../firebase/database/calender'
import { userInfo } from '../../../recoil/ExercisesState'
import { getFoodData } from '../../../utils/dataFetch'

export interface IFood {
  name: string
  processor: string
  serving_size: string
  kcal: string
  carbohydrate: string
  protein: string
  fat: string
  sugars: string
  salt: string
  cholesterol: string
  saturated_fatty_acids: string
  trans_fatty_acids: string
}

const fetchData = async (userEmail: string) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const url = `https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userEmail}/diet/${year}/${month}.json`
  const fetchs = await fetch(url)
  const json = await fetchs.json()
  return json
}

export const useFoodSearch = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [data, setData] = useState<IFood[]>([])

  const {
    data: foodList = [],
    isLoading,
    refetch,
  } = useQuery(
    [
      'userAllData',
      'diet',
      new Date().getFullYear().toString(),
      String(new Date().getMonth() + 1),
    ],
    () => fetchData(user.email.split('.')[0]),
    {
      enabled: user.email.length > 0,
      select: (data) => data[new Date().getDate()],
    },
  )

  const writeFoodList = async (item: IFood) => {
    await writeUserFoodList(user.email, item)
  }

  const getFoodSearchData = async (foodName: string) => {
    const items = await getFoodData(foodName)
    return items
  }

  const formSubmitHandler = async (e: FormEvent, foodName: string) => {
    e.preventDefault()
    const res: IFood[] = await getFoodSearchData(foodName)
    setData(res)
    return res
  }

  return {
    data,
    refetch,
    isLoading,
    foodList,
    getFoodData,
    formSubmitHandler,
    writeFoodList,
  }
}
