import { CalenderMaker, Day } from './../calender'
export interface IExerciseItem {
  bodyPart: string
  equipment: string
  gifUrl: string
  id: string
  name: string
  target: string
}
export interface IExerciseList {
  bodyPart: string
  equipment: string
  gifUrl: string
  id: string
  name: string
  target: string
}
export interface IWorkOutFormDataList {
  id: string
  targetBody: string
  exercise: string
  setTimes: string
}

export interface IWorkOutTempItemProps {
  index: number
  remove: Function
  addList: Function
  exerciseList: IExerciseList[]
}
export interface ICalender {
  calenderMaker: CalenderMaker
}
export const bodyPartColors: IBodyPartColors = {
  등: '#b37feb',
  가슴: '#69b1ff',
  어깨: '#bae637',
  하체: '#de3d3d',
  팔: '#ffa940',
  복근: '#ff85c0',
}
interface IBodyPartColors {
  [key: string]: string
}
