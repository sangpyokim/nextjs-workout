import {
  ASelectedWorkOutListItem,
  AWorkOutList,
} from './../../../recoil/AllAtom'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ATimerState } from '../../../recoil/AllAtom'
import { convertTimer } from '../../../utils/tempUtil'

interface IWorkOurListItem {
  id: number
  title: string
  set: number
  time: number
}

export interface WorkOutListItem {
  id: number
  title: string
  set: number
  timeNum: number
  time: string
}

const useNewWorkOutList = () => {
  const [timerState, setTimerState] = useRecoilState(ATimerState)
  const [list, setList] = useRecoilState(AWorkOutList)
  const [selectedItem, setSelectedItem] = useRecoilState(
    ASelectedWorkOutListItem,
  )

  const fetchData = async () => {
    const res = await fetch(
      'https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/users/rlatkdvy12@gmail/timer/list/2023/2/14.json',
    )

    const json = await res.json()

    setList(
      json.map((item: IWorkOurListItem) => {
        const obj = {
          timeNum: item.time,
          time: convertTimer(item.time),
          id: item.id,
          title: item.title,
          set: item.set,
        }
        return obj
      }),
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    list,
    selectedItem,
    setSelectedItem,
  }
}

export default useNewWorkOutList
