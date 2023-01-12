import React, { useEffect, useMemo, useRef, useState } from 'react'
import TimerButton from '../atoms/TimerButton'
import CircleInput from '../molecules/CircleInput'
import CircleTimer from '../molecules/CircleTimer'
import { SettingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { AStartToggle } from './recoil/TimerAtom'
import Modal from './Modal'
import { useModal } from './hooks/useModal'
import { useTimer } from './hooks/useTimer'

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    width: 300px;
    height: 300px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  font-family: sans-serif;
  border: 0;
  border-radius: 8px;
  width: 240px;
  height: 260px;
  /* 뉴몰피즘 */
  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
`
const IconContainer = styled.div`
  position: relative;
  top: 12px;
  height: 0px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: end;
`
const MaxTimeSetForm = styled.form`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
`
const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 8px;
`
const TimeSetInput = styled.input`
  width: 60px;
  height: 18px;
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
const MaxTimeSetButton = styled.button`
  border: 1px solid white;
  border-radius: 4px;
`

const Timer = () => {
  const { open, setOpen } = useModal()

  const inputRef = useRef<HTMLInputElement>(null)

  const {
    keys,
    isPlaying,
    setIsPlaying,
    aStartToggle,
    setAStartToggle,
    aMaxTime,
    inputHandler,
    resetTimer,
    restartTimer,
  } = useTimer(inputRef)

  return (
    <Container>
      <Modal
        open={open}
        setOpen={setOpen}
        header={'타이머 설정'}
      >
        <MaxTimeSetForm>
          <Label>최대시간 설정 (초)</Label>
          <TimeSetInput
            ref={inputRef}
            type="text"
            pattern="\d*"
            name="maxTimeSetter"
            defaultValue={aMaxTime}
            maxLength={5}
          />
          <MaxTimeSetButton onClick={(e) => inputHandler(e)}>
            확인
          </MaxTimeSetButton>
        </MaxTimeSetForm>
      </Modal>

      <IconContainer>
        <SettingOutlined onClick={() => setOpen(true)} />
      </IconContainer>

      <Wrapper>
        {aStartToggle ? (
          <>
            <CircleTimer
              keys={keys}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              style={{
                marginBottom: '8px',
                paddingTop: '6px',
              }}
            />
            <ButtonWrapper>
              <TimerButton
                label={'다시시작'}
                onClick={() => restartTimer()}
              />
              <TimerButton
                label={'초기화'}
                onClick={() => resetTimer()}
              />
            </ButtonWrapper>
          </>
        ) : (
          <CircleInput style={{ padding: '8px 0' }} />
        )}
      </Wrapper>
    </Container>
  )
}

export default React.memo(Timer)
