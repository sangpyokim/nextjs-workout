import { GetServerSideProps } from 'next'
import React, { useCallback, useEffect } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
import GroupContainer from '../../../components/group/GroupContainer'
import useGroupDetail from '../../../components/group/hooks/useGroupDetail'
import TextArea from '../../../components/group/TextArea'
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
  const { data, onSubmitHandler, user } = useGroupDetail()

  // 메시지는 위가 제일 최신
  return (
    <GroupContainer>
      <Container>
        <Body>
          {data[0][1].chats.notice === '' ? (
            <FixedMessage>{`📢: 매너 채팅`}</FixedMessage>
          ) : (
            <FixedMessage>{`📢: ${data[0][1].chats.notice}`}</FixedMessage>
          )}

          {data[0][1].chats.chat.length &&
            data[0][1].chats.chat.map(
              ([key, value]: any, i: number) =>
                value.content &&
                value.content.length !== 0 &&
                (value.writer.email === user.email.split('.')[0] ? (
                  <Message
                    key={key}
                    isMine={value.writer.email === user.email.split('.')[0]}
                    isOper={value.writer.email === 'operator'}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        height: '100%',
                      }}
                    >
                      <MessageTime>
                        {new Intl.DateTimeFormat('ko', {
                          // dateStyle: '',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(Number(value.id)))}
                      </MessageTime>
                    </div>
                    <MessageContent>{value.content}</MessageContent>
                  </Message>
                ) : (
                  <Message
                    key={key}
                    isMine={value.writer.email === user.email.split('.')[0]}
                    isOper={value.writer.email === 'operator'}
                  >
                    <MessageWriter>{value.writer.displayName}</MessageWriter>
                    <MessageContent>{value.content}</MessageContent>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        height: '100%',
                      }}
                    >
                      <MessageTime>
                        {new Intl.DateTimeFormat('ko', {
                          // dateStyle: '',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(Number(value.id)))}
                      </MessageTime>
                    </div>
                  </Message>
                )),
            )}
        </Body>

        <TextArea onSubmitHandler={onSubmitHandler} />
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
const Message = styled.div<{ isMine: boolean; isOper: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  align-items: center;
  height: 40px;
  margin: 8px 0;

  justify-content: ${(props) => props.isOper && 'center'};
  color: var(--text-color);
  font-size: ${(props) => (props.isOper ? '14px' : '16px')};
  opacity: ${(props) => (props.isOper ? '0.6' : '0.9')};
`
const MessageWriter = styled.div`
  margin: 0 4px;
`
const MessageTime = styled.div`
  margin: 0 4px;
  font-size: 0.8rem;
`
const MessageContent = styled.pre`
  margin: 0 4px;
  border: 1px solid;
  border-color: var(--border-color);
  padding: 8px;
  border-radius: 8px;
`
