import { MoreOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { ASelectedWorkOutListItem, ATimerState } from '../../recoil/AllAtom'
import RippleEffect from '../RippleEffect'
import FlatModal from './FlatModal'
import { useFlatModal } from './hooks/useFlatModal'
import useNewWorkOutList, { WorkOutListItem } from './hooks/useNewWorkOutList'
import { ProcessIcon } from './ProcessIcon'

const Container = styled.div`
  width: 100%;
  height: 100%;

  color: white;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 2rem;
  font-weight: 500;
  height: 5rem;
  /* background-color: wheat; */

  padding: 0 12px;
  margin-bottom: 8px;

  &:hover {
    cursor: pointer;
  }
`
const ItemTitleWrapper = styled.div`
  display: flex;
`
const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`
const ItemTitle = styled.div``
const ItemSubWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 300px;
`
const ItemSet = styled.div``
const ItemTotalTime = styled.div``

const InfoModal = styled.div`
  color: black;
  padding: 12px;
  font-size: 1rem;
  min-height: 8rem;
  & div {
    line-height: 1.5rem;
  }
`

const NewWorkOutList = () => {
  const {
    writeMode,
    settingOpen,
    setSettingOpen,
    addOpen,
    setAddOpen,
    onClickSettingButton,
    list,
    selectedItem,
    setSelectedItem,
    onClickWriteMode,
    selectedUpdateItem,
    selectedUpdateItemIndex,
    onChangeTitle,
    onKeyPress,
    onBlur,
  } = useNewWorkOutList()

  return (
    <Container>
      {list.map((item, i) => (
        <Item
          key={item.title}
          onClick={() => setSelectedItem(item)}
        >
          <RippleEffect>
            <ItemWrapper>
              <ItemTitle>
                {selectedUpdateItemIndex === i && writeMode ? (
                  <input
                    autoFocus
                    value={selectedUpdateItem?.title}
                    onChange={(e) => onChangeTitle(e)}
                    onKeyDown={(e) => onKeyPress(e)}
                    onBlur={() => onBlur()}
                  />
                ) : (
                  item.title
                )}
              </ItemTitle>
              <ItemSubWrapper>
                <ItemSet>{item.set} 세트</ItemSet>
                <ItemTotalTime>{item.time}</ItemTotalTime>
                <div onClick={(e) => onClickSettingButton(i, e)}>
                  <MoreOutlined />
                </div>
              </ItemSubWrapper>
            </ItemWrapper>
          </RippleEffect>
        </Item>
      ))}

      <button onClick={() => setAddOpen(true)}>추가</button>

      <FlatModal
        open={settingOpen}
        setOpen={setSettingOpen}
        header={'타이머 설명'}
      >
        <InfoModal>
          <button onClick={() => onClickWriteMode()}>수정</button>
          <button>삭제</button>
        </InfoModal>
      </FlatModal>
    </Container>
  )
}

export default NewWorkOutList

// 아이콘 이름 세트 시간
// 1. 오토포커스, 무조껀 하나는 생성되어잇음 회원 생성할때 데이터베이스 추가
// 2. [x] 하나만 선택가능
// 3. [x] 선택된 거 시간 증가
// 5. [] 선택하면 타이머 초기화, 상태 초기화
// 6. 목록 수정 이름만
// 7. 목록 삭제
// 8. 하나만 남았다면 삭제 불가
