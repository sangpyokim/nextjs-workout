import React, { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import TimerLabel from '../atoms/TimerLabel'


// 여기서부터 데이터 관리 시작.
interface ICircleTimer {
    time: number,
    keys: number,
    isPlaying: boolean,
    setIsPlaying: Function,
    style: object
}
const CircleTimer = (
    { time, keys, isPlaying, setIsPlaying, style }: ICircleTimer
    ) => {


    return (
    <div
        style={style}
    >
        <CountdownCircleTimer
            onComplete={() => setIsPlaying(false)}
            key={keys}
            isPlaying={isPlaying}
            duration={time}
            colors={['#1890ff', '#36cfc9', '#ffd666', '#ff7a45', '#cf1322']}
            colorsTime={[time/5 * 5, time/5 * 3, time/5 * 2, time/5 * 1, time/5 * 0]} // 커스텀해서 값 제공해야함
            >
            {({ remainingTime }) => (
                remainingTime > 0
                ?
                <TimerLabel 
                timer={remainingTime}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                animation={true}
                />
                :
                <div>끝</div>
            )}
        </CountdownCircleTimer>
    </div>
)}

export default CircleTimer