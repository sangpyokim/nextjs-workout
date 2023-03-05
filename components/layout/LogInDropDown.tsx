import React, { forwardRef } from 'react'
import styled from 'styled-components'

interface ILogInDropDown {
  dropDown: boolean
  setDropDown: Function
  signOut: Function
}
const LogInDropDown = ({ dropDown, setDropDown, signOut }: ILogInDropDown) => {
  return (
    <Container open={dropDown}>
      <ul>
        <li onClick={() => signOut()}>로그아웃</li>
      </ul>
    </Container>
  )
}

export default LogInDropDown

const Container = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'flex' : 'none')};
  position: absolute;
  top: 60px;
  padding: 12px 24px;
  z-index: 9;
  border: 1px solid white;

  &:after {
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: white;
  }
  & > ul > li {
    margin-bottom: 16px;
  }
  & > ul > li:last-child {
    margin-bottom: 0px;
  }
`
