import {
  getAllGroup,
  IAllGroupList,
  ICreateGroup,
} from '../../../firebase/database/newDatabase'
import { useMutation, useQuery } from 'react-query'
import React, { useRef, useState } from 'react'
import { userInfo } from '../../../recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import { createGroup, getMyGroup } from '../../../firebase/database/newDatabase'
import { useFlatModal } from '../../main/hooks/useFlatModal'
import { useModal } from '../../main/hooks/useModal'

export const useAllGroup = () => {
  const [user, _] = useRecoilState(userInfo)

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

    const createGroupData: ICreateGroup = {
      id: new Date().getTime().toString(),
      capacity: Number(data.capacity),
      chief: user,
      tag: [String(data.tag)],
      title: String(data.title),
      description: String(data.description),
    }
    // data post
    await createGroup(user.email, user.displayName, createGroupData)

    setOpen(false)
    window.alert('모임 등록이 완료되었습니다.')
    await refetch()
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
  }
}

const _dataValidator = (data: { [k: string]: FormDataEntryValue }) => {
  for (let key in data) {
    if (key == 'title' && data[key].length < 2)
      return '제목은 2자 이상으로 작성해주세요.'
    if (key == 'description' && data[key].length < 5)
      return '그룹 설명은 5자 이상으로 작성해주세요.'
  }

  return 'pass'
}
