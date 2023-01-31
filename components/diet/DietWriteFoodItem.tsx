import React from 'react'
import styled from 'styled-components'
import Modal from '../main/Modal'
import { IFood } from './hooks/useFoodSearch'

const ChildWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50vh;

  flex-direction: column;
`
const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
`
const SubTitle = styled.div`
  color: #252525;
  width: 60%;
  font-size: 14px;
  align-items: center;
  margin-bottom: 8px;
`
const SubItem = styled.div`
  width: 60%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

interface IDietWriteFoodItem {
  item: IFood
  open: boolean
  setOpen: Function
}

const DietWriteFoodItem = ({ item, open, setOpen }: IDietWriteFoodItem) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
    >
      <ChildWrapper>
        <Title>{item.name}</Title>
        <SubTitle>
          <div>1회 제공량: {item.serving_size}g</div>
          <div>칼로리: {item.kcal} kcal</div>
        </SubTitle>

        <SubItem>
          <div>1회 제공량 당</div>
          <div>
            <div>1일 영양성분</div>
            <div>기준치에 대한 비율</div>
          </div>
        </SubItem>

        <SubItem>
          <div>탄수화물: {item.carbohydrate}g</div>
          <div>{Math.floor((Number(item.carbohydrate) / 324) * 100)} %</div>
        </SubItem>
        <SubItem>
          <div>단백질: {item.protein}g</div>
          <div>{Math.floor((Number(item.protein) / 55) * 100)} %</div>
        </SubItem>
        <SubItem>
          <div>지방: {item.fat}g</div>
          <div>{Math.floor((Number(item.fat) / 54) * 100)} %</div>
        </SubItem>
        <SubItem>
          <div>나트륨: {item.salt}mg</div>
          <div>{Math.floor((Number(item.salt) / 2000) * 100)} %</div>
        </SubItem>
        <SubItem>
          <div>당류: {item.sugars}g</div>
          <div>{Math.floor((Number(item.sugars) / 100) * 100)} %</div>
        </SubItem>

        <div>
          <div>얼마나 먹엇니</div>
          <input type={'number'} />
          <input
            type={'submit'}
            value="등록하기"
          />
        </div>
      </ChildWrapper>
    </Modal>
  )
}

export default DietWriteFoodItem
