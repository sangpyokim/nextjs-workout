import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { IGroupContainer } from '../../interface'
import useGroupDetail from './hooks/useGroupDetail'

const GroupContainer = ({ children }: IGroupContainer) => {
  const router = useRouter()
  const { data } = useGroupDetail()

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
          <Link href={`/group/detail/${router.query.id}`}>
            <Links isHere={router.pathname.split('/').includes('detail')}>
              홈
            </Links>
          </Link>
          <Link href={`/group/chat/${router.query.id}`}>
            <Links isHere={router.pathname.split('/').includes('chat')}>
              채팅
            </Links>
          </Link>
          {
            <Link href={`/group/manage/${router.query.id}`}>
              <Links isHere={router.pathname.split('/').includes('manage')}>
                관리
              </Links>
            </Link>
          }
        </SubNav>
      </Header>
      {children}
    </Container>
  )
}

export default GroupContainer

const Container = styled.div`
  width: 100%;
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
  border-bottom: 1px solid;
  border-color: var(--color-btn-border-hover);
  padding-bottom: 6px;
`
const Links = styled.div<{ isHere: boolean }>`
  font-size: 1.5rem;
  margin-right: 1rem;
  font-weight: 500;
  color: ${(props) =>
    props.isHere ? 'var(--text-color)' : 'var(--text-sub-color)'};
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
