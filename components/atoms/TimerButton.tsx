import React from 'react'
import { Button, Radio } from 'antd';
import style from './TimerButton.module.css'

interface ITimerButton {
    label: string,
    onClick: Function,
    style?: object
}

const TimerButton = (
    { label, onClick }: ITimerButton
    ) => {



  return (
    <Button 
        className={style.button}
        value="default"
        onClick={() => onClick()} 
        >
        {label}
    </Button>
  )
}

export default TimerButton