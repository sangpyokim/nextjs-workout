import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getGroup } from '../../firebase/database/newDatabase'
import FlatModal from '../main/FlatModal'
import Modal from '../main/Modal'
import { useGroupDetailModal } from './hooks/useGroupDetailModal'

const Container = styled.div`
  color: black;
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

interface IGroupDetailModal {
  open: boolean
  setOpen: Function
  curGroup: string
}

const GroupDetailModal = ({ open, setOpen, curGroup }: IGroupDetailModal) => {
  const { data, isLoading, JoinGroup } = useGroupDetailModal(curGroup)

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
          <JoinButton onClick={() => JoinGroup()}>참여하기</JoinButton>
        </Footer>
      </Container>
    </FlatModal>
  )
}

export default GroupDetailModal
