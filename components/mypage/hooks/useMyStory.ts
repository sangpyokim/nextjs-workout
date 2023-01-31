import { userInfo } from './../../../recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import { useQuery } from 'react-query'
import React, { useState } from 'react'

const url = (userEmail: string) =>
  `https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userEmail}.json`

// exercise 데이터랑, diet 데이터 둘 다 가져오기
// usequery 두번써서 가져오기
const fetchData = async (userEmail: string) => {
  const fetchs = await fetch(url(userEmail))
  const json = await fetchs.json()
  return json
}

export const useMyStory = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [curDate, setCurDate] = useState(new Date())

  const {
    data: allData,
    isLoading,
    refetch,
  } = useQuery(['userAllData'], () => fetchData(user.email.split('.')[0]), {
    enabled: user.email !== '',
  })

  const getFocusDateData = (date: Date) => {
    if (!date) return []
    setCurDate(date)
    refetch()
  }

  return { getFocusDateData, allData }
}
