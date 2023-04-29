import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import {
  getGroup,
  getGroupUsersData,
  postChat,
} from '../../../firebase/database/newDatabase'
import { chatContent } from '../../../interface'
import { useCallback } from 'react'
import { userInfo } from '../../../recoil/all-atom'
import { getGroupService } from '../../../server/service/groupService'
import axios from 'axios'

const useGroupDetail = () => {
  const router = useRouter()

  const [user, _] = useRecoilState(userInfo)

  const { data = [], refetch } = useQuery(
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
  const { data: userData = [] } = useQuery(
    ['group', 'usersData', router.query.id],
    async () => {
      const res = await axios(`/api/group/${router.query.id}`)
      const data = res.data
      return data.userData
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 10 * 1000,
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
      userData.statistics &&
      userData.statistics.timeLine &&
      userData.statistics.timeLine[y] &&
      userData.statistics.timeLine[y][m] &&
      userData.statistics.timeLine[y][m][day]
    )
      return true
    return false
  }

  const onSubmitHandler = useCallback(async (value: string) => {
    if (value.length === 0) return
    const data = {
      id: new Date().getTime(),
      type: 'text',
      content: value,
      writer: {
        email: user.email.split('.')[0],
        displayName: user.displayName,
      },
    }
    await postChat(String(router.query.id), data).then(() => refetch())
  }, [])

  return {
    user,
    router,
    data,
    refetch,
    userData,
    onClickProfile,
    isUseToday,
    onSubmitHandler,
  }
}

export default useGroupDetail
