// 캘린더
// 기능
// [] 이번 달 보여주기
// [] 다음 달 넘어가기
// [] 이전 달 넘어가기
// [] 이번 달로 돌아오기
// [] 오늘 표시하기
// [] 운동 태그 표시하기
// [] 현재 월에 해당하는 데이터 가져오기
// [] 클릭하면 그날 했던 운동, 식단 가져오기
// [] 클릭한 날 하이라이트 주기

class Day {
  constructor() {}
}
class Calender {
  constructor() {}
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
