import { MoreOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import RippleEffect from '../layout/RippleEffect'
import FlatModal from './FlatModal'
import useNewWorkOutList from './hooks/useNewWorkOutList'

const NewWorkOutList = () => {
  const {
    writeMode,
    settingOpen,
    setSettingOpen,
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
    onClickDeleteButton,
    onClickAddButton,
  } = useNewWorkOutList()

  return (
    <Container>
      {list &&
        list.map((item, i) => (
          <Item
            writeMode={writeMode}
            key={item.title}
            onClick={() =>
              selectedItem?.id === item.id
                ? setSelectedItem(undefined)
                : setSelectedItem(item)
            }
          >
            <RippleEffect enable={!writeMode}>
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

      <FlatModal
        open={settingOpen}
        setOpen={setSettingOpen}
      >
        <InfoModal>
          <Button onClick={() => onClickWriteMode()}>아이템 수정</Button>
          <Button onClick={() => onClickDeleteButton()}>아이템 삭제</Button>
        </InfoModal>
      </FlatModal>

      <ButtonWrapper>
        <Button onClick={() => onClickAddButton()}>추가</Button>
      </ButtonWrapper>
    </Container>
  )
}

export default NewWorkOutList

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: var(--text-color);

  border-top: 1px solid;
  border-color: var(--border-color);
`

const Item = styled.div<{ writeMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: ${(props) => props.theme.fontSize.font_xl};
  line-height: ${(props) => props.theme.lineHeight.font_xl};
  font-weight: 500;
  height: 5rem;
  padding: 0 6px;
  margin-bottom: 8px;

  border-radius: 2px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.writeMode ? '' : 'var(--color-btn-bg-hover)'};

    border-color: ${(props) =>
      props.writeMode ? '' : 'var(--color-btn-border-hover)'};
  }
`

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`
const ItemTitle = styled.div`
  & input {
    height: 2rem;
    font-size: ${(props) => props.theme.fontSize.font_xl};
    line-height: ${(props) => props.theme.lineHeight.font_xl};
  }
`
const ItemSubWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  & div {
    margin-right: 8px;
    :last-child {
      margin-right: 0px;
    }
  }
  & svg:hover {
    color: var(--color-btn-border-hover);
  }
`
const ItemSet = styled.div``
const ItemTotalTime = styled.div``

const InfoModal = styled.div`
  padding: 12px;
  min-height: 8rem;
  & div {
    line-height: 1.5rem;
  }
`
const Button = styled.button`
  width: 100%;
  height: 4rem;
  margin-bottom: 4px;
  background-color: var(--button-bg);
  font-size: ${(props) => props.theme.fontSize.font_lg};
  line-height: ${(props) => props.theme.lineHeight.font_lg};
  font-weight: 500;
  border-radius: 2px;
  color: var(--text-color);
  border: 1px solid;
  border-color: var(--border-color);
`
const ButtonWrapper = styled.div``
