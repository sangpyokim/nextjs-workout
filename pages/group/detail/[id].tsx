import { BulbOutlined } from '@ant-design/icons'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
import GroupContainer from '../../../components/group/GroupContainer'
import useGroupDetail from '../../../components/group/hooks/useGroupDetail'
import {
  getGroup,
  getGroupUsersData,
} from '../../../firebase/database/newDatabase'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['group', 'detail', context.query.id], () =>
    getGroup([String(context.query.id!)]),
  )
  await queryClient.prefetchQuery(
    ['group', 'usersData', context.query.id],
    () => getGroupUsersData(String(context.query.id!)),
  )

  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
    },
  }
}

const _ = () => {
  const { data, userData, onClickProfile, isUseToday } = useGroupDetail()

  return (
    <GroupContainer>
      <Body>
        <Users>
          {Object.values(data[0][1].users).map((user: any, i: number) => (
            <User
              key={i}
              onClick={() => onClickProfile(userData[i][0])}
            >
              <UserImage isUseToday={() => isUseToday(userData[i][1])}>
                <BulbOutlined />
              </UserImage>
              <UserName isUseToday={() => isUseToday(userData[i][1])}>
                {user.displayName}
              </UserName>
            </User>
          ))}
        </Users>
      </Body>
    </GroupContainer>
  )
}

export default _

const Body = styled.div`
  width: 100%;
  padding: 12px;
`
//--------------------- home
const Users = styled.div`
  color: var(--text-sub-color);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  width: 100%;
`
const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 10rem;
  border: 1px solid;
  border-color: var(--border-color);

  &:hover {
    cursor: pointer;
  }
`
const UserImage = styled.div<{ isUseToday: () => boolean }>`
  font-size: 3rem;
  margin-bottom: 12px;
  color: ${(props) => props.isUseToday() && props.theme.colors.orange};
`
const UserName = styled.div<{ isUseToday: () => boolean }>`
  font-size: 2rem;
  color: ${(props) =>
    props.isUseToday() ? 'var(--text-color)' : 'var(--text-sub-color)'};
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding-bottom: 4px;
  & > * {
    margin-bottom: 4px;
  }
`
