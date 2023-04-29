import { useQuery } from 'react-query'
import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useFlatModal } from '../../main/hooks/useFlatModal'
import { useModal } from '../../main/hooks/useModal'
import { IAllGroupList } from '../../../interface'
import { userInfo } from '../../../recoil/all-atom'
import axios from 'axios'

const getAllGroup = async () => {
  const res = await axios('/api/group')
  const data: [string, IAllGroupList][] = res.data
  return data
}

export const useAllGroup = () => {
  const [user, _] = useRecoilState(userInfo)
  const [filterState, setFilterState] = useState('전체')
  const [curFocus, setCurFocus] = useState('')

  const formRef = useRef(null)

  const { open, setOpen } = useFlatModal()
  const { open: groupDetailOpen, setOpen: setGroupDetailOpen } = useModal()

  const { data = [], refetch } = useQuery(['allGroup'], () => getAllGroup(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const modalSubmitHandler = async () => {
    const formData = new FormData(formRef.current!)
    const data = Object.fromEntries(formData)

    const result = _dataValidator(data)
    if (result !== 'pass') {
      window.alert(result)
      return
    }

    const postData = {
      email: user.email,
      displayName: user.displayName,
      data,
    }

    await axios.post('/api/group', postData)

    setOpen(false)
    window.alert('모임 등록이 완료되었습니다.')
    await refetch()
  }

  const isJoined = (group: IAllGroupList) => {
    return group.users && group.users[user.email.split('.')[0]]
  }

  return {
    data,
    formRef,
    curFocus,
    setCurFocus,
    open,
    setOpen,
    groupDetailOpen,
    setGroupDetailOpen,
    modalSubmitHandler,
    isJoined,
    setFilterState,
    filterState,
  }
}

const _dataValidator = (data: any) => {
  for (let key in data) {
    if (key == 'title' && data[key].length < 2)
      return '제목은 2자 이상으로 작성해주세요.'
    if (key == 'description' && data[key].length < 5)
      return '그룹 설명은 5자 이상으로 작성해주세요.'
  }

  return 'pass'
}
