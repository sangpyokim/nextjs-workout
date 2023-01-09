import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

interface ITimerButton {
  label: string
  onClick: Function
  style?: object
}

const Buttons = styled(Button)`
  width: 80px;
  height: 20px;
  border: 0;
  font-size: 12px;
  color: #252525;
  border-radius: 20px;

  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
  &:hover {
    ${({ theme }) => theme.neumorphism.hover.box_shadow};
  }
  &:active {
    ${({ theme }) => theme.neumorphism.active.box_shadow};
  }
`

const TimerButton = ({ label, onClick }: ITimerButton) => {
  return (
    <Buttons
      value="default"
      onClick={() => onClick()}
    >
      {label}
    </Buttons>
  )
}

export default TimerButton
