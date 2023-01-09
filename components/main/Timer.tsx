import React, { useEffect, useMemo, useRef, useState } from 'react'
import TimerButton from '../atoms/TimerButton'
import CircleInput from '../molecules/CircleInput'
import CircleTimer from '../molecules/CircleTimer'
import { SettingOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { AStartToggle } from './recoil/TimerAtom'

const MAX_SECOND = 120

const Container = styled.div`
  // 반응형 고민..
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

const Timer = () => {
  const [aStartToggle, setAStartToggle] = useRecoilState(AStartToggle)
  const [keys, setKey] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const resetTimer = () => {
    setAStartToggle(false)
    setIsPlaying(false)
  }
  const restartTimer = () => {
    setIsPlaying(false)
    setKey((prev) => prev + 1)
  }

  return (
    <Container>
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
