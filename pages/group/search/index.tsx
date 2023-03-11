import React from 'react'
import styled from 'styled-components'
import { useAllGroup } from '../../../components/group/hooks/useAllGroup'

import { format, register } from 'timeago.js'
import koLocale from 'timeago.js/lib/lang/ko' //한국어 선택
import FormModal from '../../../components/group/FormModal'
import GroupDetailModal from '../../../components/group/GroupDetailModal'

const GroupSearch = () => {
  const {
    data: allGroupData,
    formRef,
    curFocus,
    setCurFocus,
    open,
    setOpen,
    groupDetailOpen,
    setGroupDetailOpen,
    modalSubmitHandler,
    isJoined,
  } = useAllGroup()

  register('ko', koLocale)

  return (
    <Container>
      <AllGroupSection>
        <AllGroupSectionTitle>그룹들</AllGroupSectionTitle>

        <MakeGroup>
          <div onClick={() => setOpen(true)}>그룹 만들기</div>
        </MakeGroup>

        <AllGroupList>
          {allGroupData.map(([key, group]) => (
            <AllGroupItem
              key={key}
              onClick={() => {
                setCurFocus(key)
                setGroupDetailOpen(true)
              }}
            >
              <div>
                <AllGroupItemTagWrapper>
                  {group.info.tag.map((tag) => (
                    <AllGroupItemTag key={tag}>{tag}</AllGroupItemTag>
                  ))}
                  {isJoined(group) && (
                    <AllGroupItemIsJoin>참여중</AllGroupItemIsJoin>
                  )}
                </AllGroupItemTagWrapper>

                <AllGroupItemTitle>{group.info.title}</AllGroupItemTitle>

                <AllGroupItemSub>
                  <AllGroupItemSubItem>
                    {`그룹장: ${group.info.chief.displayName}`}
                  </AllGroupItemSubItem>

                  <AllGroupItemSubItem>
                    {`인원: ${Object.keys(group.users).length}/${
                      group.info.capacity
                    }명`}
                  </AllGroupItemSubItem>
                  <AllGroupItemSubItem>{`그룹 생성일: ${new Intl.DateTimeFormat(
                    'ko',
                    { dateStyle: 'long' },
                  ).format(
                    new Date(Number(group.info.id)),
                  )}`}</AllGroupItemSubItem>
                </AllGroupItemSub>
                <AllGroupItemDes>{group.info.description}</AllGroupItemDes>
              </div>

              <AllGroupItemTimeAgo>
                <div>{format(group.info.id, 'ko')}</div>
              </AllGroupItemTimeAgo>
            </AllGroupItem>
          ))}
        </AllGroupList>
      </AllGroupSection>

      {formRef && (
        <FormModal
          formRef={formRef}
          open={open}
          setOpen={setOpen}
          modalSubmitHandler={modalSubmitHandler}
        />
      )}

      {curFocus && (
        <GroupDetailModal
          open={groupDetailOpen}
          setOpen={setGroupDetailOpen}
          curGroup={curFocus}
        />
      )}
    </Container>
  )
}

export default GroupSearch

const Container = styled.div`
  color: white;
`
const AllGroupSection = styled.section``
const AllGroupSectionTitle = styled.div`
  font-size: 2rem;
  width: 100%;
  margin-bottom: 12px;
`
const AllGroupList = styled.div``
const AllGroupItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray};
  margin-bottom: 1rem;
  border-radius: 4px;
  padding: 14px;

  &:hover {
    cursor: pointer;
  }
`
const AllGroupItemTagWrapper = styled.div`
  display: flex;
  margin-bottom: 4px;
`
const AllGroupItemTag = styled.div`
  color: ${(props) => props.theme.colors.orange};
  font-size: 1.1rem;
  font-weight: 500;
  margin-right: 4px;
`
const AllGroupItemIsJoin = styled.div`
  margin-left: 4px;
  opacity: 0.8;
  color: ${(props) => props.theme.colors.gray_background};
`
const AllGroupItemTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 8px;
`
const AllGroupItemSub = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-bottom: 12px;
  opacity: 0.7;
`
const AllGroupItemSubItem = styled.div`
  margin-right: 8px;
`
const AllGroupItemDes = styled.div`
  font-weight: 500;
  opacity: 0.7;
  height: 1rem;

  overflow: hidden;
`
const AllGroupItemTimeAgo = styled.div`
  font-weight: 500;
  opacity: 0.7;
  min-width: fit-content;
`
const MakeGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.yellow};
  font-weight: 500;
  font-size: 1.2rem;
  & > div:hover {
    cursor: pointer;
  }
`
