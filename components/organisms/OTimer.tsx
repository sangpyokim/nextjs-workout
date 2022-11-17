import React, { useEffect, useRef, useState } from 'react'
import TimerButton from '../atoms/TimerButton'
import CircleInput from '../molecules/CircleInput'
import CircleTimer from '../molecules/CircleTimer'
import styles from './OTimer.module.css'



interface ITimer {
    initSec: number,
}

const Timer = ({ initSec = 1 }: ITimer) => {
    const [ keys, setKey ] = useState(1);
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ time, setTime ] = useState(5)
    const [ toggle, setToggle ] = useState(false)
    
    const resetTimer = () => {
        setToggle(false)
        setIsPlaying(false)
    }
    const restartTimer = () => {
        setIsPlaying(false)
        setKey(prev => prev+1)
    }




    return (
    <div className={styles.container} >
        <div className={styles.wrapper} >
        {
            toggle
        ?
        <>
            <CircleTimer 
                time={time} 
                keys={keys} 
                isPlaying={isPlaying} 
                setIsPlaying={setIsPlaying}
                style={{ marginBottom: '8px' }}
            />
            <div className={styles.buttonWrapper} >
                <TimerButton 
                    label={"다시시작"} 
                    onClick={() => restartTimer()}  
                    style={{ width: '80px' }}
                />
                <TimerButton 
                    label={"초기화"} 
                    onClick={() => resetTimer()}
                    style={{ width: '80px' }}    
                />
            </div>
        </>
        :
            <CircleInput setTime={setTime} initSec={initSec} setToggle={setToggle} maxSec={120} />
        }
        </div>
    </div>
  )
}

export default Timer