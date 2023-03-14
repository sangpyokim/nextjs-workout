import React, { useEffect } from 'react'
import styled from 'styled-components'
import { IGroupDetailModal } from '../../interface'
import FlatModal from '../main/FlatModal'
import { useGroupDetailModal } from './hooks/useGroupDetailModal'

// 가입된 그룹 가입되었다고 표시하기

const GroupDetailModal = ({ open, setOpen, curGroup }: IGroupDetailModal) => {
  const { data, isLoading, JoinGroup, isJoined } = useGroupDetailModal(curGroup)

  if (isLoading) return null

  return (
    <FlatModal
      header={data[0][1].info.title}
      open={open}
      setOpen={setOpen}
      getFooter={false}
    >
      <Container>
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

        <Des>{data[0][1].info.description}</Des>

        <Footer>
          {isJoined(data[0][1]) ? (
            <AlreadyJoinButton>이미 참여 중 입니다</AlreadyJoinButton>
          ) : (
            <JoinButton onClick={() => JoinGroup()}>참여하기</JoinButton>
          )}
        </Footer>
      </Container>
    </FlatModal>
  )
}

export default GroupDetailModal

const Container = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid gray;
  & > * {
    margin-bottom: 4px;
  }
`
const Des = styled.div`
  min-height: 5rem;
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const JoinButton = styled.div`
  color: ${(props) => props.theme.colors.orange};
  font-weight: 600;
  padding: 8px;

  &:hover {
    cursor: pointer;
  }
`
const AlreadyJoinButton = styled.div`
  opacity: 0.8;
  font-weight: 600;
  padding: 8px;
`
