import React, { FormEvent, useRef, useState } from 'react'
import { useIsFetching } from 'react-query'
import styled from 'styled-components'
import { useModal } from '../main/hooks/useModal'
import DietFoodSearchItemModal from './DietFoodSearchItemModal'
import DietWriteFoodItem from './DietWriteFoodItem'
import { IFood, useFoodSearch } from './hooks/useFoodSearch'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 240px;
  padding: 8px;
  padding-bottom: 16px;

  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
`

const FoodForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const FoodFormItem = styled.div`
  @media ${({ theme }) => theme.breakPoint.mobile} {
    font-size: 14px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
`
const FoodFormItemInfo = styled.div`
  display: flex;
  & div:first-child {
    margin-right: 6px;
  }
`
const Title = styled.header`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid #252525;
  margin-bottom: 16px;
`
const FoodSearchForm = styled.form`
  margin-bottom: 8px;
`
const TimeSetInput = styled.input`
  width: 240px;
  height: 24px;
  margin: 8px 0;
  margin-right: 8px;
  border: 0;
  border-radius: 4px;
`
const TimeBlock = styled.button`
  height: 24px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  border: 0;
  color: ${({ theme }) => theme.colors.black};

  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};

  &:hover {
    box-shadow: ${({ theme }) => theme.neumorphism.hover.box_shadow};
  }
  &:active {
    box-shadow: ${({ theme }) => theme.neumorphism.active.box_shadow};
  }
`

const FoodSearch = () => {
  const [curFocusItem, setCurFocusItem] = useState<IFood>({
    name: '',
    processor: '',
    serving_size: '',
    kcal: '',
    carbohydrate: '',
    protein: '',
    fat: '',
    sugars: '',
    salt: '',
    cholesterol: '',
    saturated_fatty_acids: '',
    trans_fatty_acids: '',
  })
  const foodNameRef = useRef<HTMLInputElement>(null)

  const { data, refetch, formSubmitHandler, writeFoodList } = useFoodSearch()
  const { open, setOpen } = useModal()
  const { open: open2, setOpen: setOpen2 } = useModal()
  const isLoading = useIsFetching()

  const onClick = (item: IFood) => {
    setOpen(true)
    setCurFocusItem(item)
  }
  const writeFoodItem = async (item: IFood) => {
    setOpen2(true)
    setCurFocusItem(item)
    // await writeFoodList(item)
    // await refetch()
  }

  return (
    <Container>
      <Title>
        <div>식단 검색하기</div>
      </Title>

      <FoodSearchForm
        onSubmit={(e) => formSubmitHandler(e, foodNameRef.current!.value)}
      >
        <label>음식 이름: </label>
        <TimeSetInput
          type={'text'}
          ref={foodNameRef}
        />

        <TimeBlock type={'submit'}>검색</TimeBlock>
      </FoodSearchForm>

      <FoodForm>
        {isLoading ? <div>loading...</div> : null}
        {data.map((res) => (
          <FoodFormItem key={res.name}>
            <FoodFormItemInfo>
              <div>{res.name}</div>
              <div>{res.kcal}kcal</div>
            </FoodFormItemInfo>

            <div>
              <button
                type="button"
                onClick={() => onClick(res)}
              >
                자세히보기
              </button>
              <button
                type="button"
                onClick={() => writeFoodItem(res)}
              >
                선택하기
              </button>
            </div>
          </FoodFormItem>
        ))}
      </FoodForm>

      <DietFoodSearchItemModal
        open={open}
        setOpen={setOpen}
        item={curFocusItem}
      />

      <DietWriteFoodItem
        open={open2}
        setOpen={setOpen2}
        item={curFocusItem}
      />
    </Container>
  )
}

export default FoodSearch
