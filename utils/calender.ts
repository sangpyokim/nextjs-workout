export class Day {
  day
  isToday
  isThisMonth
  exerciseTag: any[]
  dietData: any[]

  constructor(
    day: number,
    isToday: boolean,
    isThisMonth: boolean,
    exerciseTag: any[] = [],
    dietData: any[] = [],
  ) {
    this.day = day
    this.isToday = isToday
    this.isThisMonth = isThisMonth
    this.exerciseTag = exerciseTag
    this.dietData = dietData
  }
}
export class CalenderMaker {
  date: Date = new Date()
  year: number = -1
  month: number = -1
  curFocus: number = -1
  monthString: string = ''
  list: Day[][]

  constructor() {
    const D = new Date()
    this.init(D)
    this.list = this.setList()
  }
  init(D: Date) {
    this.date = D
    this.year = D.getFullYear()
    this.month = D.getMonth()
    this.monthString = D.toLocaleDateString('en-US', { month: 'long' })
  }
  // 이번 달 달력만들기, divider = -1 | 0 | 1 이전, 현재, 이후 달
  // force = 강제 업데이트 => 달은 그대로인데 안의 요소가 바뀔 수 있음
  // 데이터 받아오면 강제 업데이트 해야함
  setList(
    divider: -1 | 0 | 1 = 0,
    exerciseData: any[] = [],
    dietData: any[] = [],
  ) {
    // 마지막 일, 첫 일 요일, 이번달의 주의 개수
    const D = new Date(this.year, this.month + divider, this.date.getDate())
    const monthLastDate = new Date(this.year, this.month + divider, 0).getDate()
    const monthStartDay = new Date(this.year, this.month + divider, 1).getDay()
    const monthWeekCount = Math.ceil((monthStartDay + monthLastDate) / 7)

    const prevMonthLastDate = new Date(
      this.year,
      this.month + divider,
      0,
    ).getDate()
    const nextMonthStartDay = new Date(
      this.year,
      this.month + divider + 1,
      1,
    ).getDay()

    // 다른 멤버 수정
    this.init(D)
    // list 수정
    this.listInit(monthWeekCount)
    this.setListPrevMonth(monthStartDay, prevMonthLastDate)
    this.setListNextMonth(nextMonthStartDay)
    this.setListCurMonth(exerciseData, dietData)

    return this.list
  }

  private setListCurMonth(exerciseData: any[] = [], dietData: any[] = []) {
    if (!exerciseData) exerciseData = []
    if (!dietData) dietData = []
    const today = this.date.getDate()
    const isToday = this.isToday()

    let days = 1
    for (let j in this.list) {
      for (let k in this.list[j]) {
        if (this.list[j][k] === undefined) {
          this.list[j][k] = new Day(
            days,
            days === today && isToday ? true : false,
            true,
            exerciseData[days],
            dietData[days],
          )
          days += 1
        }
      }
    }
  }
  private isToday() {
    const curMonth = new Date().getMonth()
    const thisMonth = this.month
    if (curMonth !== thisMonth) return false
    return true
  }

  private listInit(monthWeekCount: number) {
    this.list = Array.from({ length: monthWeekCount }, () =>
      new Array(7).fill(undefined),
    )
  }
  private setListPrevMonth(days: number, endDate: number) {
    const res: Day[] = Array.from({ length: 7 })
    const startDate = endDate - days + 1
    let j = 0
    for (let i = startDate; i <= endDate; i++) {
      res[j] = new Day(i, false, false)
      j += 1
    }
    this.list[0] = res
  }

  private setListNextMonth(days: number) {
    const res: Day[] = Array.from({ length: 7 })
    if (days === 0) return res
    let j = 1
    for (let i = days; i < 7; i++) {
      res[i] = new Day(i, false, false)
      j++
    }
    this.list[this.list.length - 1] = res
  }

  getList(): Day[][] {
    return this.list
  }
  getYear() {
    return this.year
  }
  getMonth() {
    return this.month
  }
}

// curDate = 월 / 일 / 년
export const initCalender = (curDate: string) => {
  const date = new Date(curDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  // console.log(year, month, today)
  const monthLastDate = new Date(year, month, 0).getDate()
  const monthStartDay = new Date(year, month, 1).getDay()
  const monthWeekCount = Math.ceil((monthStartDay + monthLastDate) / 7)

  const prevMonthLastDate = new Date(year, month, 0).getDate()
  const nextMonthStartDay = new Date(year, month + 1, 1).getDay()
  // console.log(monthLastDate, monthStartDay, monthWeekCount, nextMonthStartDay)
  const dateList: number[][] = Array.from({ length: monthWeekCount }, () =>
    new Array(7).fill(undefined),
  )

  const prevDateList = getPrevCalenderArr(monthStartDay, prevMonthLastDate)
  const nextDateList = getNextCalenderArr(nextMonthStartDay)
  dateList[0] = prevDateList
  dateList[dateList.length - 1] = nextDateList
  let i = 1
  for (let j in dateList) {
    for (let k in dateList[j]) {
      if (typeof dateList[j][k] !== 'number') {
        dateList[j][k] = i
        i += 1
      }
    }
  }

  return dateList
}

const getPrevCalenderArr = (days: number, endDate: number) => {
  const res: any[] = Array.from({ length: 7 }, () => undefined)
  const startDate = endDate - days + 1
  let j = 0
  for (let i = startDate; i <= endDate; i++) {
    res[j] = i
    j += 1
  }
  return res
}

const getNextCalenderArr = (days: number) => {
  const res: number[] = Array.from({ length: 7 })
  if (days === 0) return res
  let j = 1
  for (let i = days; i < 7; i++) {
    res[i] = j
    j++
  }
  return res
}

export const getDateString = (newDate: Date = new Date()) => {
  return new Intl.DateTimeFormat('en-US').format(newDate)
}

export const getKoreaDateString = (newDate: Date = new Date()) => {
  return new Intl.DateTimeFormat('ko').format(newDate)
}
