import { BulbOutlined, DragOutlined } from '@ant-design/icons'
import { GetServerSideProps } from 'next'
import React, { useRef, useState } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
import GroupContainer from '../../../components/group/GroupContainer'
import useManage from '../../../components/group/hooks/useManage'
import {
  getGroup,
  getGroupUsersData,
} from '../../../firebase/database/newDatabase'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['group', 'detail', context.query.id], () =>
    getGroup([String(context.query.id!)]),
  )

  return {
    props: {
      dehydratedProps: dehydrate(queryClient),
    },
  }
}
// 그룹장변경, 유저 강퇴 -> 드래그 앤 드랍 연습
// 그룹장 존, 유저 존 구분
// 수정, 삭제
const Manage = () => {
  const {
    groupData,
    changeChief,
    deleteUser,
    handleDragStart,
    handleDrop,
    handleDragOver,
    handleDeleteDragLeave,
    handleChiefDragLeave,
    chiefHovered,
    deleteHovered,
  } = useManage()

  return (
    <GroupContainer>
      <Body>
        <UsersTitle>그룹장</UsersTitle>
        <Users
          id="chief"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleChiefDragLeave}
          isHover={chiefHovered}
        >
          <User
            id="chief"
            onDragOver={handleDragOver}
            onDragStart={(e) =>
              handleDragStart(
                e,
                groupData[0][1].info.chief.email,
                groupData[0][1].info.chief.displayName,
              )
            }
          >
            <UserImage>
              <BulbOutlined />
            </UserImage>
            <UserName>{groupData[0][1].info.chief.displayName}</UserName>

            <DragIcon>
              <DragOutlined />
            </DragIcon>
          </User>
        </Users>

        <UsersTitle>일반 유저</UsersTitle>
        <Users
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          isHover={false}
        >
          {Object.values(groupData[0][1].users)
            .filter(
              (user: any) =>
                user.newUserEmail !==
                groupData[0][1].info.chief.email.split('.')[0],
            )
            .map((user: any, i: number) => (
              <User
                key={i}
                draggable
                onDragStart={(e) =>
                  handleDragStart(e, user.newUserEmail, user.displayName)
                }
              >
                <UserImage>
                  <BulbOutlined />
                </UserImage>
                <UserName>{user.displayName}</UserName>
                <DragIcon>
                  <DragOutlined />
                </DragIcon>
              </User>
            ))}
        </Users>

        <DeleteButton
          id="delete"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDeleteDragLeave}
          isHover={deleteHovered}
        >
          유저 강퇴
        </DeleteButton>
      </Body>
    </GroupContainer>
  )
}

export default Manage

const Body = styled.div`
  width: 100%;
  padding: 12px;
`
const UsersTitle = styled.div`
  margin-bottom: 6px;
`
const Users = styled.div<{ isHover: boolean }>`
  color: var(--text-sub-color);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  width: 100%;

  border: 2px solid;
  border-color: var(--button-bg);
  padding: 8px;
  margin-bottom: 8px;

  background-color: ${(props) =>
    props.isHover ? 'var(--header-bg)' : 'transparent'};
`
const User = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 10rem;
  border: 1px solid;
  border-color: var(--border-color);

  &:hover {
    cursor: ${(props) => (props.id !== 'chief' ? 'pointer' : '')};
    & > a {
      display: ${(props) => (props.id !== 'chief' ? 'flex' : '')};
    }
  }
`
const UserImage = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.orange};
`
const UserName = styled.div`
  font-size: 2rem;
  color: var(--text-color);
`
const DeleteButton = styled.div<{ isHover: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 50px;
  border: 1px solid;
  border-color: ${(props) =>
    props.isHover ? 'transparent' : props.theme.colors.red};
  color: ${(props) => (props.isHover ? 'white' : props.theme.colors.red)};
  background-color: ${(props) =>
    props.isHover ? props.theme.colors.red : 'transparent'};
`
const DragIcon = styled.a`
  display: none;
  position: absolute;
  top: 4px;
  right: 4px;
  color: var(--text-color);
`
