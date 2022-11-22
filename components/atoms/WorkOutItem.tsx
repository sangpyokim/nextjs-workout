import React, { useState } from 'react'
import { listProps } from '../organisms/TodayWorkOutList'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #454545;
    margin-bottom: 8px;
    padding: 4px;
    border-radius: 4px;
    background-color: #eee;
    box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    6px 6px 10px rgba(0, 0, 0, 0.15);
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 4px;
`
const Button = styled.button`

`
const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 4px;
`
const ProgressContainer = styled.div`
  height: 6px;
  width: 100%;
  margin: 0 1px;
  background-color: '#e4e4e4';
`
const ProgressBar = styled.div<IProgressBar>`
  height: 6px;
  width: ${props => props.progress > props.index ? '100%' : '0%' };
  margin: 0 1px;
  background-color: black;
  transition: width 0.3s ease-in-out;
`

interface IProgressBar {
  progress: number,
  index: number
}

const WorkOutItem = ({ targetBody, exercise, setTimes }: listProps) => {
  const [ progress, setProgress ] = useState(0)

  const handleProgressUp = () => {
    if (progress < Number(setTimes)) {
      setProgress(prev => prev+1)
    }
  }

  return (
    <Container>
      <div>{targetBody}</div>
      <div>{exercise}</div>
      <ProgressBarWrapper>
        {Array.from({length: Number(setTimes)})
          .map((v, i) => (
        <ProgressContainer key={i}>
          <ProgressBar progress={progress} index={i}  />
        </ProgressContainer>
      ))}
      </ProgressBarWrapper>

      <Button onClick={() => handleProgressUp()} >진행사항 증가</Button>
    </Container>
  )
}

export default WorkOutItem