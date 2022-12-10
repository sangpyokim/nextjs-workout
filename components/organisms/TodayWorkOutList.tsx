import React, { useEffect, useState } from 'react'
import WorkOutTempItem from '../atoms/WorkOutTempItem'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { IExerciseList, IWorkOutFormDataList } from '../../utils/types/exercise'
import {
  authLoading,
  exerciseDataList,
  userInfo,
} from '../../utils/recoil/ExercisesState'
import { useQuery } from 'react-query'
import axios from 'axios'
import {
  getUserExerciseData,
  setUserExerciseData,
  updateUserExerciseData,
} from '../../utils/firebase/FireStore'
import { getMyAuth } from '../../utils/firebase/Auth'
import WorkOutItem from '../atoms/WorkOutItem'
import { getKoreaDateString } from '../../utils/calender'

const Container = styled.section`
  display: flex;
  padding: 8px;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  border: 0;
  border-radius: 8px;
  width: 240px;
  min-height: 80px;

  /* 뉴몰피즘 */
  background-color: #eee;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    6px 6px 10px rgba(0, 0, 0, 0.15);
`
const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 8px;
`
const Title = styled.div`
  font-size: 14px;
  color: #454545;
  font-weight: 500;
`
const PlusButton = styled.button`
  display: flex;
  border: 0;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: black;
  font-size: 16px;

  background-color: #eee;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    6px 6px 10px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  &:active {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
`

const data2 = {
  id: '',
  targetBody: '',
  exercise: '',
  setTimes: '',
}

const TodayWorkOutList = () => {
  // recoil
  const [loading, setLoading] = useRecoilState(authLoading)
  const [user, setUser] = useRecoilState(userInfo)
  const [exerciseList, setExerciseList] =
    useRecoilState<IExerciseList[]>(exerciseDataList)
  // react query
  const { isLoading, refetch } = useQuery(
    ['userExercise'],
    () => fetchData().then((res) => setList(res)),
    {
      enabled: !loading && user.email.length > 0,
    },
  )
  // react
  const [list, setList] = useState<IWorkOutFormDataList[]>([])
  const [tempList, setTempList] = useState<IWorkOutFormDataList[]>([])

  const addList = async (data: IWorkOutFormDataList) => {
    setList((prev) => {
      const temp = [...prev]
      temp.push(data)
      return temp
    })

    if (user.email.length > 0) {
      const curDate = getKoreaDateString(new Date())
      const uid = user.email.split('@')[0]
      await setUserExerciseData(uid, curDate, data)
      // refetch()
      // fetchData()
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

  const fetchData = async () => {
    const curDate = getKoreaDateString(new Date())
    const uid = user.email.split('@')[0]
    const res = await getUserExerciseData(uid, curDate).then((res) => res)
    return res
    //   .then((res) => {
    //   setData(res)
    //   setIsLoading(false)
    // })
  }

  // useEffect(() => {
  //   if (!loading && user.email.length > 0) {
  //     fetchData()
  //   }
  //   // getTemp(data2)
  //   console.log('오늘의 운동 데이터 fetch:', loading)
  // }, [loading])

  if (loading || isLoading) return <Container></Container>

  return (
    <Container>
      <TitleWrapper>
        <Title>오늘의 운동</Title>
      </TitleWrapper>

      {list &&
        list.map((li, i) => (
          <WorkOutItem
            key={li.id}
            id={li.id}
            targetBody={li.targetBody}
            exercise={li.exercise}
            setTimes={li.setTimes}
          />
        ))}

      {tempList.map((_, i) => (
        <WorkOutTempItem
          key={i}
          index={i}
          addList={addList}
          remove={removeTempList}
          exerciseList={exerciseList}
        />
      ))}

      <PlusButton onClick={() => addTempList()}>+</PlusButton>
    </Container>
  )
}

export default TodayWorkOutList
