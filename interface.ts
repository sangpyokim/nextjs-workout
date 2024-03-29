import { ReactElement, ReactNode } from 'react'

export type TTimerState = 'ready' | 'running' | 'stop' | 'end'
export type TShowMode = 'normal' | 'second' // normal: 시 : 분 : 초, second: 초만 표시
export type TTimerMode = 'single' | 'double'

export interface WorkOutListItem {
  id: number
  title: string
  set: number
  timeNum: number
  time: string
}

// statistics
export interface ITimeLineItem {
  title: string
  time: string
  type: TTimerState
}
export interface INewTimeLineItem extends ITimeLineItem {
  showTime: string
}
export interface IDay {
  day: number
  month: number
  thisMonth: boolean
  isToday: boolean
  isFocus: boolean
  data: ITimeLineItem[][] | null
}
export interface INewDay extends IDay {
  data: INewTimeLineItem[][] | null
}
export interface IMonth {
  month: number
  year: number
  days: IDay[][]
  totalTime?: number
}
export interface ICalender {
  curDate: Date
  calender: IDay[][]
  selectedDate: IDay
  setSelectedDate: Function
  isLoading: boolean
  onClickPrevMonth: Function
  onClickNextMonth: Function
}
export interface ITimeLine {
  selectedDate: INewDay | undefined
}

export interface IFormModal {
  open: boolean
  setOpen: Function
  formRef: React.MutableRefObject<null>
  modalSubmitHandler: Function
}
export interface IGroupDetailModal {
  open: boolean
  setOpen: Function
  curGroup: string
}

// db
export interface IMember {
  displayName: string
  email: string
}
export interface ICreateGroup {
  id: string
  chief: IMember
  title: string
  password?: string
  tag: string[]
  capacity: number
  description: string
}

export interface IPostGroup {
  info: ICreateGroup
  users: any
  chats: chats
}
interface chats {
  notice: string
  chat: chat
}
export interface chat {
  [id: number]: chatContent
}
export interface chatContent {
  id: number
  writer: IMember
  content: string
  type: string
}

export interface IAllGroupList extends IPostGroup {}

export interface ITimerSettingValue {
  mode: TShowMode
  type: TTimerMode
  t1: number
  t2: number
}

// layout
export type LayoutProps = {
  children: ReactElement
}

export interface IGroupContainer {
  children: ReactNode
}

export interface ITextArea {
  onSubmitHandler: Function
}

export interface IChart {
  pieData: IPieChartData
  barData: IBarChartData
}
export interface IPieChartDataFunc {
  (selectedDate: INewDay): IPieChartData | undefined
}
export interface IBarChartDataFunc {
  (selectedDate: INewDay): IBarChartData | undefined
}

export interface IPieChartData {
  label: string[]
  data: number[]
  count: number
}
export interface IBarChartData {
  labels: string[]
  data1: IChartDataSets
  data2: IChartDataSets
}
export interface IChartDataSets {
  label: string
  backgroundColor: string
  data: number[]
}

export interface IPieChart {
  data: IPieChartData
}
export interface IBarChart {
  data: IBarChartData
}
