import React, { use, useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { isLoggedIn } from '../../firebase/auth/Auth'
import { curFocusDay, userInfo } from '../../recoil/ExercisesState'
import { CalenderMaker, Day } from '../../utils/calender'
import DietFoodSearchItemModal from '../diet/DietFoodSearchItemModal'
import { IFood } from '../diet/hooks/useFoodSearch'
import { useModal } from '../main/hooks/useModal'
import { useCalenders } from './hooks/useCalenders'
import { useMyStory } from './hooks/useMyStory'

const Container = styled.div`
  width: 100%;
`
const ContainerTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 12px 0;
`

const ItemContainer = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    min-height: 120px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 20px;
  font-family: sans-serif;

  border-radius: 8px;

  min-height: 120px;
  width: 100%;
  max-width: 100%;
  /* 뉴몰피즘 */
  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
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
const TotalKcal = styled.div`
  font-size: 14px;
  font-weight: 400;
  opacity: 0.8;
`

const FoodItem = styled.div`
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
const FoodItemInfo = styled.div`
  display: flex;
  & div:first-child {
    margin-right: 6px;
  }
`

const Button = styled.button`
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

interface IMyStory {
  calenderMaker: CalenderMaker
}

// curFocus에 모든 정보 다 넣기 -> 전역상태화
const MyStory = ({ calenderMaker }: IMyStory) => {
  const [user, setUser] = useRecoilState(userInfo)
  const [curFocus, setCurFocus] = useRecoilState(curFocusDay)
  const [curItem, setCurItem] = useState({
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
  const { open, setOpen } = useModal()

  const handleClickDietItem = (item: IFood) => {
    setCurItem(item)
    setOpen(true)
  }

  return (
    <Container>
      <ContainerTitle>
        {user.email === ''
          ? '로그인을 해주세요'
          : `${calenderMaker.getYear()}년 ${calenderMaker.getMonth() + 1}월 ${
              curFocus.day === -1 ? new Date().getDate() : curFocus.day
            }일의 데이터`}
      </ContainerTitle>

      <ItemContainer>
        <Title>운동</Title>
        {curFocus.exerciseTag.map((l, i) => (
          <FoodItem key={i}>
            <FoodItemInfo>
              <div>{l.targetBody}</div>
              <div>{l.exercise}</div>
              <div>{l.setTimes}</div>
            </FoodItemInfo>
          </FoodItem>
        ))}
      </ItemContainer>

      <ItemContainer>
        <Title>
          <div>식단</div>
          {curFocus.dietData.length > 0 && (
            <TotalKcal>
              총 칼로리:
              {curFocus.dietData
                .map((a) => Math.ceil(a.kcal * 1))
                .reduce((prev, cur) => prev + cur)}
              kcal
            </TotalKcal>
          )}
        </Title>
        {curFocus.dietData.map((l: IFood, i) => (
          <FoodItem key={i}>
            <FoodItemInfo>
              <div>{l.name}</div>
              <div>{l.kcal}kcal</div>
            </FoodItemInfo>

            <div>
              <Button
                type="button"
                onClick={() => handleClickDietItem(l)}
              >
                자세히보기
              </Button>
            </div>
          </FoodItem>
        ))}
      </ItemContainer>

      <DietFoodSearchItemModal
        open={open}
        setOpen={setOpen}
        item={curItem}
      />
    </Container>
  )
}

export default MyStory
