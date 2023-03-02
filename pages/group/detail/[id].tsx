import { BulbOutlined } from '@ant-design/icons'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import styled from 'styled-components'
import useGroupDetail from '../../../components/group/hooks/useGroupDetail'
import {
  getGroup,
  getGroupUsersData,
} from '../../../firebase/database/newDatabase'

// 가입 여부 확인하고, 컴포넌트 로드
type Data = {
  data: string
}

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
  const router = useRouter()
  const { data, userData, onClickProfile, isUseToday } = useGroupDetail()

  return (
    <Container>
      <Header>
        <Title>{data[0][1].info.title}</Title>

        <Info>
          <div>카테고리: {data[0][1].info.tag[0]}</div>
          <div>그룹장: {data[0][1].info.chief.displayName}</div>
          <div>
            {`인원: ${Object.keys(data[0][1].users).length}/${
              data[0][1].info.capacity
            }명`}
          </div>
          <div>{`그룹 생성일: ${new Intl.DateTimeFormat('ko', {
            dateStyle: 'full',
          }).format(new Date(Number(data[0][1].info.id)))}`}</div>
        </Info>

        <SubNav>
          <Link href={'./'}>
            <Links isHere={router.pathname.split('/').at(-1) === '[id]'}>
              홈
            </Links>
          </Link>
          <Link href={'./'}>
            <Links isHere={router.pathname.split('/').at(-1) === 'chat'}>
              채팅
            </Links>
          </Link>
        </SubNav>
      </Header>

      {/*바디만 갈아끼우기*/}
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
    </Container>
  )
}

export default _

const Container = styled.div`
  color: white;
`
const Header = styled.header``
const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.7rem;
  font-weight: 500;
  margin-bottom: 8px;
`
const SubNav = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid gray;
  padding-bottom: 6px;
`
const Links = styled.div<{ isHere: boolean }>`
  font-size: 1.5rem;
  margin-right: 1rem;
  font-weight: 500;
  color: ${(props) => (props.isHere ? 'white' : 'gray')};
`
const Body = styled.div`
  width: 100%;
  padding: 12px;
`
//--------------------- home
const Users = styled.div`
  color: gray;
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
  border: 1px solid gray;

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
  color: ${(props) => (props.isUseToday() ? '#ddd' : 'gray')};
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
