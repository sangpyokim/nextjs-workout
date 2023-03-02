import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import {
  getGroup,
  getGroupUsersData,
} from '../../../firebase/database/newDatabase'

const useGroupDetail = () => {
  const router = useRouter()
  const { data = [] } = useQuery(
    ['group', 'detail', router.query.id],
    () => getGroup([String(router.query.id!)]),
    {
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

  const onClickProfile = (email: string) => {
    const res = window.confirm('상대방의 통계를 보시겠습니까?')
    if (!res) return

    router.push(`/statistics/${email.split('.')[0]}`)
  }

  const isUseToday = (userData: any) => {
    const d = new Date()
    const y = d.getFullYear()
    const m = d.getMonth() + 1
    const day = d.getDate()
    if (
      userData.statistics.timeLine &&
      userData.statistics.timeLine[y] &&
      userData.statistics.timeLine[y][m] &&
      userData.statistics.timeLine[y][m][day]
    )
      return true
    return false
  }

  return {
    router,
    data,
    userData,
    onClickProfile,
    isUseToday,
  }
}

export default useGroupDetail
