import { useMutation, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { createGroup, getMyGroup } from '../../../firebase/database/newDatabase'
import { userInfo } from '../../../recoil/all-atom'

export const useMyGroup = () => {
  const [user, _] = useRecoilState(userInfo)

  const { data = [] } = useQuery(
    [user.email, 'myGroup'],
    () => getMyGroup(user.email),
    {
      enabled: user.email !== '',
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )
  const { mutate } = useMutation({
    mutationFn: () =>
      createGroup(user.email, user.displayName, {
        id: new Date().getTime().toString(),
        capacity: 3,
        chief: {
          displayName: user.displayName,
          email: user.email,
        },
        description: '아무나오세요',
        tag: ['대학생'],
        title: '공부해요',
      }),
  })

  return { data, mutate }
}
