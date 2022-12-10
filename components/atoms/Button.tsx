import React from 'react'
import styled from 'styled-components'

interface IButton {
  title: string
  action: Function
}

const CustomButton = styled.button`
  width: 100%;
  height: 100%;
  color: black;
  font-weight: 500;
  border: 1px solid white;
  border-radius: 4px;
  background-color: #f2f2f2;
  &:hover {
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
`

const Button = ({ action, title }: IButton) => {
  return (
    <CustomButton
      onClick={() => action()}
      type="button"
    >
      {title}
    </CustomButton>
  )
}

export default Button
