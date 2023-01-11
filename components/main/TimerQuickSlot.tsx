import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { AMaxTime, AStartTime, AStartToggle } from './recoil/TimerAtom'

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    margin-left: 16px;
    width: 140px;
    margin-top: 0px;
  }
  @media ${({ theme }) => theme.breakPoint.tablet} {
    margin-left: 16px;
    width: 140px;
    margin-top: 0px;
  }
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  padding: 8px;

  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
  border-radius: 4px;
`

const TimeQuickSlot = styled.div``
const TimeBlockWrapper = styled.div`
  @media ${({ theme }) => theme.breakPoint.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(35px, 1fr));
    grid-auto-rows: minmax(35px, 1fr);
  }
  margin: 8px 0 12px 0;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  grid-auto-rows: minmax(40px, auto);
  gap: 4px;
`
const TimeBlock = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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
const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 8px;
`
const TimeSetInput = styled.input`
  width: 60px;
  margin: 8px 0;
  border: 0;
  border-radius: 4px;

  box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.7),
    inset -5px -5px 10px #ddd;
  transition: all 0.2s ease-in-out;

  &:focus {
    box-shadow: inset 1px 1px 2px rgba(255, 255, 255, 0.7),
      inset -1px -1px 2px #ddd;
  }
`
const MaxTimeSetForm = styled.form`
  display: flex;
  flex-direction: column;
`
const MaxTimeSetButton = styled.button`
  border: 1px solid white;
  border-radius: 4px;
`

// 타이머설정, 최대시간 설정 가져오기

const TimerQuickSlot = () => {
  const [aStartToggle, setAStartToggle] = useRecoilState(AStartToggle)
  const [aMaxTime, setAMaxTime] = useRecoilState(AMaxTime)
  const [aStartTime, setAStartTime] = useRecoilState(AStartTime)

  const inputRef = useRef<HTMLInputElement>(null)

  const temp = (e: React.MouseEvent) => {
    e.preventDefault()
    setAStartToggle(true)
    setAMaxTime(Number(inputRef.current?.value))
    setTimeout(() => {
      setAStartToggle(false)
    }, 1)
  }

  return (
    <Container>
      <TimeQuickSlot>
        <Label>바로가기</Label>
        <TimeBlockWrapper>
          <TimeBlock
            onClick={(e) => setAStartTime(Number(e.currentTarget.value))}
            value={30}
          >
            30초
          </TimeBlock>
          <TimeBlock
            onClick={(e) => setAStartTime(Number(e.currentTarget.value))}
            value={60}
          >
            1분
          </TimeBlock>
          <TimeBlock
            onClick={(e) => setAStartTime(Number(e.currentTarget.value))}
            value={90}
          >
            1분 30초
          </TimeBlock>
          <TimeBlock
            onClick={(e) => setAStartTime(Number(e.currentTarget.value))}
            value={300}
          >
            5분
          </TimeBlock>
          <TimeBlock
            onClick={(e) => setAStartTime(Number(e.currentTarget.value))}
            value={600}
          >
            10분
          </TimeBlock>
          <TimeBlock
            onClick={(e) => setAStartTime(Number(e.currentTarget.value))}
            value={1200}
          >
            20분
          </TimeBlock>
          <TimeBlock
            onClick={(e) => setAStartTime(Number(e.currentTarget.value))}
            value={1800}
          >
            30분
          </TimeBlock>
        </TimeBlockWrapper>
      </TimeQuickSlot>

      <MaxTimeSetForm>
        <Label>최대시간 설정 (초)</Label>
        <TimeSetInput
          ref={inputRef}
          type="text"
          pattern="\d*"
          name="maxTimeSetter"
          defaultValue={120}
          maxLength={5}
        />
        <MaxTimeSetButton onClick={(e) => temp(e)}>확인</MaxTimeSetButton>
      </MaxTimeSetForm>
    </Container>
  )
}

export default TimerQuickSlot
