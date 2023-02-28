import { MessageFilled } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { useMyGroup } from '../../components/group/hooks/useMyGroup'

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  font-size: 2rem;
  width: 100%;
  margin-bottom: 12px;
`
const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`
const GroupItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #aaaaaa88;
  padding: 8px;
`
const GroupItemLeft = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`
const GroupItemTitle = styled.div`
  font-size: 1.3rem;
  margin-bottom: 4px;
`
const GroupItemChief = styled.div`
  opacity: 0.8;
  margin-bottom: 2px;
`
const GroupItemInfo = styled.div`
  display: flex;
  opacity: 0.8;
  & > div {
    margin: 0 4px;
  }
  & div:first-child {
    margin-left: 0;
  }
`
const GroupItemChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`
const MoreGroup = styled.div`
  color: ${(props) => props.theme.colors.yellow};
  font-weight: 500;
`
// 비공개
const _ = () => {
  const router = useRouter()

  const { data: myGroup, mutate } = useMyGroup()
  console.log(myGroup)

  return (
    <Container>
      <Title onClick={() => mutate()}>내 그룹</Title>
      <GroupList>
        {myGroup.map((group) => (
          <GroupItem key={group.info.id}>
            <GroupItemLeft>
              <GroupItemTitle>{group.info.title}</GroupItemTitle>
              <GroupItemChief>{group.info.chief.displayName}</GroupItemChief>
              <GroupItemInfo>
                <div>
                  {group.info.tag.map((t: string) => (
                    <div key={t}>{t}</div>
                  ))}
                </div>
                ∙
                <div>
                  {Object.keys(group.users).length}/{group.info.capacity}명
                </div>
              </GroupItemInfo>
            </GroupItemLeft>
            <GroupItemChat>
              <MessageFilled style={{ fontSize: '1.5rem', opacity: 0.8 }} />
            </GroupItemChat>
          </GroupItem>
        ))}
      </GroupList>
      <Link href={'./search'}>
        <MoreGroup>그룹 둘러보러가기</MoreGroup>
      </Link>
    </Container>
  )
}

export default _
