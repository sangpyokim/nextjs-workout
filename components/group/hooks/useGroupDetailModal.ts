import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { getGroup, joinGroup } from '../../../firebase/database/newDatabase'
import { userInfo } from '../../../recoil/ExercisesState'

export const useGroupDetailModal = (groupId: string) => {
  const [user, _] = useRecoilState(userInfo)
  const router = useRouter()

  const { data = [], isLoading } = useQuery(
    ['groupDetail', groupId],
    () => getGroup([groupId]),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )

  const JoinGroup = async () => {
    const result = window.confirm('이 그룹에 참여하시겠습니까?')
    if (!result) return

    await joinGroup(user.email, user.displayName, groupId)
      .then(() => window.alert('가입되었습니다.'))
      .then(() => router.reload())
  }

  return {
    data,
    isLoading,
    JoinGroup,
  }
}
