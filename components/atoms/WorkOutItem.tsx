import React, { useState } from 'react'
import styled from 'styled-components'
import { isLoggedIn } from '../../firebase/auth/Auth'
import { IWorkOutFormDataList } from '../../utils/types/exercise'
import Button from './Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #454545;
  margin-bottom: 12px;
  padding: 4px;
  border-radius: 4px;
  background-color: #eee;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    6px 6px 10px rgba(0, 0, 0, 0.15);
  border: 1px solid white;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
  margin: 4px 0;
`

const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 8px;
`
const ProgressContainer = styled.div`
  height: 6px;
  width: 100%;
  margin: 0 1px;
  background-color: #d2d2d2;
`
const ProgressBar = styled.div<IProgressBar>`
  height: 6px;
  width: ${(props) => (props.progress > props.index ? '100%' : '0%')};
  margin: 0 1px;
  background-color: black;
  transition: width 0.3s ease-in-out;
`
const TargetBody = styled.div`
  font-size: 12px;
  color: #757575;
  margin-bottom: 4px;
`
const ExerciseName = styled.div`
  color: #252525;
  margin-bottom: 6px;
`

interface IProgressBar {
  progress: number
  index: number
}

const WorkOutItem = ({
  id,
  targetBody,
  exercise,
  setTimes,
}: IWorkOutFormDataList) => {
  const [progress, setProgress] = useState(0)

  const handleProgressUp = () => {
    let temp = progress

    if (temp < Number(setTimes)) {
      setProgress(temp + 1)

      if (temp + 1 === Number(setTimes) && isLoggedIn()) {
        // writeUserExerciseDate('rlatkdvy12', {
        //   id:
        //   exercise,
        //   setTimes,
        //   targetBody,
        // })
      }
    }
  }

  return (
    <Container>
      <TargetBody>{targetBody}</TargetBody>
      <ExerciseName>{exercise}</ExerciseName>
      <ProgressBarWrapper>
        {Array.from({ length: Number(setTimes) }).map((v, i) => (
          <ProgressContainer key={i}>
            <ProgressBar
              progress={progress}
              index={i}
            />
          </ProgressContainer>
        ))}
      </ProgressBarWrapper>

      <ButtonWrapper>
        {progress + '' === setTimes ? (
          <Button
            title="운동완료"
            action={() => handleProgressUp()}
          />
        ) : (
          <Button
            title="1Set UP"
            action={() => handleProgressUp()}
          />
        )}
      </ButtonWrapper>
    </Container>
  )
}

export default WorkOutItem
