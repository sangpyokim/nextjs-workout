import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'

interface ITimerLabel {
  timer: number
  animation?: boolean
  isPlaying: boolean
  setIsPlaying: Function
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`
const Label = styled.span`
  font-size: 3rem;
  line-height: 54px;
  font-family: 'timer-font';
`
const SubLabel = styled.span`
  opacity: 0.4;
  font-size: 1rem;
`

const TimerLabel = ({
  timer,
  setIsPlaying,
  animation = false,
  isPlaying,
  ...props
}: ITimerLabel) => {
  return (
    <Container
      {...props}
      onClick={() => setIsPlaying((prev: boolean) => !prev)}
    >
      <SubLabel>{isPlaying ? 'Remaining' : ''}</SubLabel>

      <div>
        <Label key={timer}>{isPlaying ? timer : 'start'}</Label>
      </div>

      <SubLabel>{isPlaying ? 'seconds' : ''}</SubLabel>
    </Container>
  )
}

export default TimerLabel
