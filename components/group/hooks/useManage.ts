import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import {
  deleteGroupMember,
  getGroup,
  getGroupUsersData,
} from '../../../firebase/database/newDatabase'
import { chatContent } from '../../../interface'
import { userInfo } from '../../../recoil/all-atom'
import { IMember, IPostGroup } from '../../../interface'
import axios from 'axios'

const useManage = () => {
  const [chiefHovered, setChiefHovered] = useState(false)
  const [deleteHovered, setDeleteHovered] = useState(false)
  const [user, _] = useRecoilState(userInfo)
  const router = useRouter()

  const { data: groupData = [], refetch } = useQuery(
    ['group', 'detail', router.query.id],
    async () => {
      const res = await getGroup([String(router.query.id!)])
      const chats = Object.entries<chatContent>(res[0][1].chats.chat).sort(
        (a, b) => {
          if (a[0] < b[0]) return 1
          if (b[0] < a[0]) return -1
          return 0
        },
      )
      res[0][1].chats.chat = chats
      return res
    },
    {
      enabled: user.email.length !== 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )
  const { data: userData = [] } = useQuery(
    ['group', 'usersData', router.query.id],
    () => getGroupUsersData(String(router.query.id!)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  interface IType {
    groupID: string
    email: string
  }

  const deleteUserMutate = useMutation(deleteGroupMember)

  useEffect(() => {
    if (!user.email) return

    if (!isChief(user.email, groupData)) {
      alert('그룹장만 접근할 수 있습니다.')
      router.back()
    }

    return () => {}
  }, [user])

  const changeChief = async (userInfo: string) => {
    if (isChief(userInfo, groupData)) return

    // 그룹장 변경
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
    const email = e.dataTransfer.getData('index')
    if (e.target.id === 'delete') {
      console.log('delete', email)
      setDeleteHovered(false)
      deleteUser(email)
      // 삭제
    }
    if (e.target.id === 'chief') {
      console.log('chief', email)
      setChiefHovered(false)
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

  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.setData('index', item)
  }

  return {
    groupData,
    userData,
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
