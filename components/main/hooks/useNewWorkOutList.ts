import {
  ASelectedWorkOutListItem,
  AWorkOutList,
} from './../../../recoil/AllAtom'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ATimerState } from '../../../recoil/AllAtom'
import { convertTimer } from '../../../utils/tempUtil'
import { useFlatModal } from './useFlatModal'

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
  const { open: settingOpen, setOpen: setSettingOpen } = useFlatModal()
  const { open: addOpen, setOpen: setAddOpen } = useFlatModal()

  const [timerState, setTimerState] = useRecoilState(ATimerState)
  const [list, setList] = useRecoilState(AWorkOutList)
  const [selectedItem, setSelectedItem] = useRecoilState(
    ASelectedWorkOutListItem,
  )

  const [selectedUpdateItem, setSelectedUpdateItem] =
    useState<WorkOutListItem>()
  const [selectedUpdateItemIndex, setSelectedUpdateItemIndex] =
    useState<number>(-1)
  const [writeMode, setWriteMode] = useState(false)

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

  // 버튼 클릭 -> 현재상태 저장, 모달 띄우기 -> 수정, 삭제버튼 -> 수정모드 진입, 삭제
  const onClickSettingButton = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    console.log(e)
    e.stopPropagation()

    setWriteMode(false)

    setSelectedUpdateItem(list[index])
    setSelectedUpdateItemIndex(index)
    setSettingOpen(true)
  }
  const onClickWriteMode = () => {
    setWriteMode(true)
    setSettingOpen(false)
  }
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 선택된 거 변경 (보여주는것만)
    const newObj: WorkOutListItem = {
      id: selectedUpdateItem!.id,
      set: selectedUpdateItem!.set,
      time: selectedUpdateItem!.time,
      timeNum: selectedUpdateItem!.timeNum,
      title: e.currentTarget.value,
    }
    setSelectedUpdateItem(newObj)
  }
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터누르면 저장: 쓰기모드 변경, 선택된거변경, 리스트변경, 서버에 저장
    if (e.key === 'Enter') {
      _setCurState()
      // ------------------------------
      // local, 서버에 저장하기
    } else if (e.key === 'Escape') {
      setWriteMode(false)
    }
  }
  const onBlur = () => {
    _setCurState()
  }
  const _setCurState = () => {
    const newArr = list.slice()
    newArr.splice(selectedUpdateItemIndex, 1, selectedUpdateItem!)
    setList(newArr)
    setWriteMode(false)

    // 선택된거랑 같다면 바꿈
    if (selectedItem?.id === selectedUpdateItem?.id)
      setSelectedItem(selectedUpdateItem)
  }

  const addList = (newItem: WorkOutListItem) => {
    setList([...list, newItem])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    writeMode,
    settingOpen,
    setSettingOpen,
    addOpen,
    setAddOpen,
    onClickSettingButton,
    list,
    selectedItem,
    setSelectedItem,
    onClickWriteMode,
    selectedUpdateItem,
    selectedUpdateItemIndex,
    onChangeTitle,
    onKeyPress,
    onBlur,
  }
}

export default useNewWorkOutList
