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
  calenderList: number[][]
}
export const bodyPartColors: IBodyPartColors = {
  가슴: '#69b1ff',
  등: '#b37feb',
  하체: '#de3d3d',
}
interface IBodyPartColors {
  [key: string]: string
}
