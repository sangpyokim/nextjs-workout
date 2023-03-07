import { GetServerSideProps } from 'next'
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
  const { data } = useGroupDetail()
  // 메시지는 위가 제일 최신
  return (
    <GroupContainer>
      <Container>
        <Body>
          <FixedMessage>📢: 다들 욕하지말고 채팅해주세요.</FixedMessage>
          <Message isMine={false}>닉네임, 채팅, 시간</Message>
          <Message isMine={false}>닉네임, 채팅, 시간</Message>
          <Message isMine={true}>시간 채팅</Message>
          <Message isMine={false}>닉네임, 채팅, 시간</Message>
        </Body>
        <InputSection>
          <Input placeholder="텍스트를 입력해주세요." />
          <Submit
            type={'submit'}
            value={'전송'}
          />
        </InputSection>
      </Container>
    </GroupContainer>
  )
}

export default _

const Container = styled.div`
  display: flex;
  width: 100%;
  padding-top: 8px;
  position: relative;
`
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const FixedMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: fit-content;
  margin: 8px 0;
  padding: 4px 8px;

  border: 1px solid ${(props) => props.theme.colors.gray_white};
  color: ${(props) => props.theme.colors.gray_background};
  opacity: 0.6;

  border-radius: 12px;
`
const Message = styled.div<{ isMine: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  height: 40px;
  width: 100%;
  margin: 8px 0;
  padding: 8px;

  color: ${(props) => (props.isMine ? 'white' : '#f5f5f5')};
  font-size: 24px;

  border-radius: 12px;
`

const InputSection = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  max-width: 1020px;
  width: 100%;
  height: 60px;
  border: 1px solid white;
  border-radius: 12px;

  position: fixed;
  bottom: 12px;
  @media screen and (max-width: 1060px) {
    left: 0px;
    max-width: 1060px;
  }
`
const Input = styled.textarea`
  /* outline: none; */
  background-color: black;
  color: white;
  border: none;
  max-width: 100%;
  width: 100%;
  font-size: 32px;
  height: 52px;
`
const Submit = styled.input`
  background-color: transparent;
  width: 60px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.yellow};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.yellow};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`
