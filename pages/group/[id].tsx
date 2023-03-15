import { MessageFilled } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

import { useMyGroup } from '../../components/group/hooks/useMyGroup'

const _ = () => {
  const { data: myGroup, mutate } = useMyGroup()

  return (
    <Container>
      <Title onClick={() => mutate()}>내 그룹</Title>
      <GroupList>
        {myGroup.map(([key, group]) => (
          <GroupItem key={group.info.id}>
            <GroupItemLeft href={`/group/detail/${key}`}>
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
            <GroupItemChat href={`/group/chat/${key}`}>
              <MessageFilled />
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

const Container = styled.div`
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.font_xxl};
  line-height: ${(props) => props.theme.lineHeight.font_xxl};
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
  border-bottom: 1px solid;
  border-color: var(--color-btn-border-hover);
  padding: 4px;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
    background-color: var(--color-btn-bg-hover);

    border-color: var(--color-btn-border-hover);
  }
`
const GroupItemLeft = styled(Link)`
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`
const GroupItemTitle = styled.div`
  font-size: ${(props) => props.theme.fontSize.font_base};
  line-height: ${(props) => props.theme.lineHeight.font_base};
`
const GroupItemChief = styled.div`
  font-size: ${(props) => props.theme.fontSize.font_sm};
  line-height: ${(props) => props.theme.lineHeight.font_sm};
  opacity: 0.8;
`
const GroupItemInfo = styled.div`
  font-size: ${(props) => props.theme.fontSize.font_sm};
  line-height: ${(props) => props.theme.lineHeight.font_sm};
  display: flex;
  opacity: 0.8;
  & > div {
    margin: 0 4px;
  }
  & div:first-child {
    margin-left: 0;
  }
`
const GroupItemChat = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.font_lg};
  line-height: ${(props) => props.theme.lineHeight.font_lg};
  &:hover {
    cursor: pointer;
    color: var(--color-btn-bg-hover);
  }
`
const MoreGroup = styled.div`
  color: ${(props) => props.theme.colors.yellow};
  font-size: ${(props) => props.theme.fontSize.font_base};
  line-height: ${(props) => props.theme.lineHeight.font_base};
  font-weight: 500;
`
