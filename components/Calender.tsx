import React from 'react'
import styled from 'styled-components'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const Container = styled.div`
  max-width: 320px;
  width: 100%;
  height: 200px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 8px;
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  width: 100%;
  height: 34px;
`
const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Month = styled.div`
  font-size: 14px;
  margin-right: 4px;
`
const Year = styled.div`
  font-size: 18px;
  font-weight: 600;
`
const IconContainer = styled.div`
  display: flex;
`
const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DaysGridContainer = styled.div`
  height: 200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
`
const DaysColumnsWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
`
const DaysItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Days = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  background-color: #f2f2f2;
  width: 50%;
  font-size: 12px;
  font-weight: 500;
`
const TiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 20px;
  padding: 0 2px;
`
const Ties = styled.div`
  width: 100%;
  height: 4px;
  background-color: red;
  margin-bottom: 2px;
`

// 캘린더 데이터가져오기
// 현재 캘린더에 적힌 월, 년 기준으로 달력 만들기 -> 버튼 누르면 캘린더 재 랜더링
// days -> background-color(이번달, 오늘), color(이번달, 이번달 x, 오늘)
// ties -> 운동에따른 지정색. 최대 4개
const Calender = () => {
  return (
    <Container>
      <TitleContainer>
        <TimeContainer>
          <Month>march</Month>
          <Year>2022</Year>
        </TimeContainer>
        <IconContainer>
          <IconWrapper>
            <LeftOutlined style={{ fontSize: '12px' }} />
          </IconWrapper>
          <IconWrapper>
            <RightOutlined style={{ fontSize: '12px' }} />
          </IconWrapper>
        </IconContainer>
      </TitleContainer>

      <DaysGridContainer>
        <DaysColumnsWrapper>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
        </DaysColumnsWrapper>
        <DaysColumnsWrapper>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
        </DaysColumnsWrapper>
        <DaysColumnsWrapper>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
        </DaysColumnsWrapper>
        <DaysColumnsWrapper>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
        </DaysColumnsWrapper>
        <DaysColumnsWrapper>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
        </DaysColumnsWrapper>
        <DaysColumnsWrapper>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
        </DaysColumnsWrapper>
        <DaysColumnsWrapper>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
          <DaysItem>
            <Days>1</Days>
            <TiesWrapper>
              <Ties />
              <Ties />
              <Ties />
              <Ties />
            </TiesWrapper>
          </DaysItem>
        </DaysColumnsWrapper>
      </DaysGridContainer>
    </Container>
  )
}

export default Calender
