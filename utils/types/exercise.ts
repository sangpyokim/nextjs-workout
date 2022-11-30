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
  index?: number
  targetBody: string
  exercise: string
  setTimes: string
}

export interface IWorkOutTempItemProps {
  index: number
  remove: Function
  add: Function
  exerciseList: IExerciseList[]
}
