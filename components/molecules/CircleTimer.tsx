import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useRecoilState } from 'recoil'
import TimerLabel from '../atoms/TimerLabel'
import { AStartTime } from '../main/recoil/TimerAtom'

interface ICircleTimer {
  keys: number
  isPlaying: boolean
  setIsPlaying: Function
  style: object
}
const CircleTimer = ({
  keys,
  isPlaying,
  setIsPlaying,
  style,
}: ICircleTimer) => {
  const [aStartTime, setAStartTime] = useRecoilState(AStartTime)

  return (
    <div style={style}>
      <CountdownCircleTimer
        onComplete={() => setIsPlaying(false)}
        key={keys}
        isPlaying={isPlaying}
        duration={aStartTime}
        colors={['#1890ff', '#36cfc9', '#ffd666', '#ff7a45', '#cf1322']}
        colorsTime={[
          (aStartTime / 5) * 5,
          (aStartTime / 5) * 3,
          (aStartTime / 5) * 2,
          (aStartTime / 5) * 1,
          (aStartTime / 5) * 0,
        ]} // 커스텀해서 값 제공해야함
      >
        {({ remainingTime }) =>
          remainingTime > 0 ? (
            <TimerLabel
              timer={remainingTime}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              animation={true}
            />
          ) : (
            <div>끝</div>
          )
        }
      </CountdownCircleTimer>
    </div>
  )
}

export default CircleTimer
