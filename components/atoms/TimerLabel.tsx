import React from 'react'
import styles from './TimerLabel.module.css'
import localFont from '@next/font/local'

interface ITimerLabel {
  timer: number,
  animation?: boolean,
  isPlaying: boolean,
  setIsPlaying: Function,
}

const myFont = localFont({ src: '../../font/BMEuljiro10yearslater.ttf', preload: true })

const TimerLabel = (
  { timer, setIsPlaying, animation = false, isPlaying, ...props }: ITimerLabel
  ) => {

    
    return (
    <div 
     className={styles.container}
     {...props} onClick={() => setIsPlaying((prev: boolean) => !prev)} >
        <span className={styles.subLabel} >{isPlaying ? 'Remaining' : ''}</span>

      <span className={myFont.className} >

        <span className={styles.label} key={timer} >
            {isPlaying ? timer : 'start'}
        </span>
      </span>

        <span className={styles.subLabel} >{isPlaying ? 'seconds' : ''}</span>
    </div>
    )
}

export default TimerLabel