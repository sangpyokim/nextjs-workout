import React, { useEffect, useRef, useState } from 'react'
import TimerButton from '../atoms/TimerButton'
import CircleInput from '../molecules/CircleInput'
import CircleTimer from '../molecules/CircleTimer'
import styles from './OTimer.module.css'
import { SettingOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const MAX_SECOND = 120

const IconWrapper = styled.div`
  display: flex;
  width: 200px;
  justify-content: flex-end;
  position: absolute;
`
const SettingModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  opacity: 1;
  transition: opacity 1s ease-in 0s;
`
const SettingModal = styled.div`
  height: 40vh;
  min-width: 50%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

interface ITimer {
  initSec: number
}

const Timer = ({ initSec = 1 }: ITimer) => {
  const [keys, setKey] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(5)
  const [startToggle, setStartToggle] = useState(false)
  const [settingModal, setSettingModal] = useState(false)

  const resetTimer = () => {
    setStartToggle(false)
    setIsPlaying(false)
  }
  const restartTimer = () => {
    setIsPlaying(false)
    setKey((prev) => prev + 1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {startToggle ? (
          <>
            <CircleTimer
              time={time}
              keys={keys}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              style={{
                marginBottom: '8px',
                paddingTop: '6px',
              }}
            />
            <div className={styles.buttonWrapper}>
              <TimerButton
                label={'다시시작'}
                onClick={() => restartTimer()}
              />
              <TimerButton
                label={'초기화'}
                onClick={() => resetTimer()}
              />
            </div>
          </>
        ) : (
          <CircleInput
            setTime={setTime}
            initSec={initSec}
            setToggle={setStartToggle}
            maxSec={MAX_SECOND}
            style={{ padding: '8px 0' }}
          />
        )}
        <IconWrapper>
          <SettingOutlined
            onClick={(e) => setSettingModal(true)}
            style={{ padding: 4 }}
          />
        </IconWrapper>
      </div>
    </div>
  )
}

export default Timer
