import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { ITextArea } from '../../interface'
import useTextArea from './hooks/useTextArea'

const TextArea = ({ onSubmitHandler }: ITextArea) => {
  const { text, handleTextChange, handleKeyUp, handleKeyPress } =
    useTextArea(onSubmitHandler)

  return (
    <InputSection>
      <Input
        placeholder="텍스트를 입력해주세요."
        onKeyDown={(e) => handleKeyPress(e)}
        onKeyUp={(e) => handleKeyUp(e)}
        onChange={(e) => handleTextChange(e)}
        value={text}
      />
      <Submit
        type={'submit'}
        value={'전송'}
      />
    </InputSection>
  )
}

export default TextArea

const InputSection = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  max-width: 1020px;
  width: 100%;

  position: fixed;
  bottom: 12px;
  @media screen and (max-width: 1060px) {
    left: 0px;
    max-width: 1060px;
  }
`
const Input = styled.textarea`
  /* outline: none; */
  background-color: black;
  color: white;
  border: none;
  max-width: 100%;
  width: 100%;
  font-size: 20px;
  height: 48px;
  border-bottom: 1px solid white;
`
const Submit = styled.input`
  background-color: transparent;
  width: 60px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.yellow};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.yellow};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`
