import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { getGroup, joinGroup } from '../../../firebase/database/newDatabase'
import { IAllGroupList } from '../../../interface'
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

  // 조인할 때 최대인원이면 참가x
  // 비밀번호
  const isJoined = (group: IAllGroupList) => {
    return group.users && group.users[user.email.split('.')[0]]
  }

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
    isJoined,
  }
}
