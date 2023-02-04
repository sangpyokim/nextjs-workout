import React from 'react'
import { useRecoilState } from 'recoil'
import { curFocusDay } from '../../recoil/ExercisesState'
import { CalenderMaker, Day } from '../../utils/calender'
import { useCalenders } from './hooks/useCalenders'
import { useMyStory } from './hooks/useMyStory'

interface IMyStory {
  calenderMaker: CalenderMaker
}

const MyStory = ({ calenderMaker }: IMyStory) => {
  const [curFocus, setCurFocus] = useRecoilState(curFocusDay)

  return (
    <div>
      <div>{`${calenderMaker.getYear()}년 ${calenderMaker.getMonth() + 1}월 ${
        curFocus.day
      }일의 데이터`}</div>
      <div>
        <div>운동</div>
        <div>{curFocus.exerciseTag.map((l) => l.exercise)}</div>
      </div>
      <div>
        <div>식단</div>
        <div>{curFocus.dietData.map((l) => l.name)}</div>
      </div>
      <div></div>
    </div>
  )
}

export default MyStory
