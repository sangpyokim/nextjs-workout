import React from 'react'
import { Button, Radio } from 'antd';

interface ITimerButton {
    label: string,
    onClick: Function,
    style?: object
}

const TimerButton = (
    { label, onClick, style }: ITimerButton
    ) => {



  return (
    <Button 
        style={style}
        value="default"
        onClick={() => onClick()} 
        >
        {label}
    </Button>
  )
}

export default TimerButton