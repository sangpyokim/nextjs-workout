import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import {
  deleteGroupMember,
  updateGroupChief,
} from '../../../firebase/database/newDatabase'

import { userInfo } from '../../../recoil/all-atom'
import { IPostGroup } from '../../../interface'
import axios from 'axios'

const useManage = () => {
  const [chiefHovered, setChiefHovered] = useState(false)
  const [deleteHovered, setDeleteHovered] = useState(false)
  const [user, _] = useRecoilState(userInfo)
  const router = useRouter()

  const { data: groupData = [], refetch } = useQuery(
    ['group', 'detail', router.query.id],
    async () => {
      const res = await axios(`/api/group/${router.query.id}`)
      const data = res.data
      return data.groupData
    },
    {
      enabled: user.email.length !== 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 10 * 1000,
    },
  )

  const deleteUserMutate = useMutation(deleteGroupMember)
  const updateChiefMutate = useMutation(updateGroupChief)

  useEffect(() => {
    if (!user.email) return

    return () => {}
  }, [user])

  const changeChief = async (email: string, displayName: string) => {
    if (isChief(email, groupData)) return

    // 그룹장 변경
    updateChiefMutate.mutate({
      email: email,
      groupID: groupData[0][0],
      displayName,
    })
  }

  const deleteUser = async (userInfo: string) => {
    if (isChief(userInfo, groupData))
      return alert('그룹장은 강퇴할 수 없습니다.')

    // 유저 삭제
    deleteUserMutate.mutate({ email: userInfo, groupID: groupData[0][0] })
  }
  const isChief = (userInfo: string, groupInfo: IPostGroup[][]) => {
    if (userInfo === groupInfo[0][1].info.chief.email) return true

    return false
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
    if (e.target.id === 'delete') {
      setDeleteHovered(true)
    }
    if (e.target.id === 'chief') {
      setChiefHovered(true)
    }
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    const email = e.dataTransfer.getData('email')
    const displayName = e.dataTransfer.getData('displayName')
    if (e.target.id === 'delete') {
      setDeleteHovered(false)
      deleteUser(email).then(() => {
        alert('삭제되었습니다.')
        router.reload()
      })
      // 삭제
    }
    if (e.target.id === 'chief') {
      setChiefHovered(false)
      changeChief(email + '.com', displayName).then(() => {
        alert('변경되었습니다.')
        router.reload()
      })
      // 삭제
    }
  }
  const handleDeleteDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDeleteHovered(false)
  }
  const handleChiefDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setChiefHovered(false)
  }

  const handleDragStart = (
    e: React.DragEvent,
    email: string,
    displayName: string,
  ) => {
    e.dataTransfer.setData('email', email)
    e.dataTransfer.setData('displayName', displayName)
  }

  return {
    groupData,
    changeChief,
    deleteUser,
    handleDragStart,
    handleDrop,
    handleDragOver,
    handleDeleteDragLeave,
    handleChiefDragLeave,
    chiefHovered,
    deleteHovered,
  }
}

export default useManage
