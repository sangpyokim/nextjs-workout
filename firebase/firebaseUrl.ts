const endPoint =
  'https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app'
const urlParams = {
  diet: 'diet',
  exercises: 'exercises',
  timerSettingValue: 'settings/timer',
  timerList: 'timer/list',
  statistics: 'statistics',
  timeLine: 'statistics/timeLine',
}

const userTimerSettingUrl = (email: string) => {
  return `${endPoint}/users/${email.split('.')[0]}/${
    urlParams.timerSettingValue
  }.json`
}

// type userTimerListUrl = (userEmail: string) => string
const userTimerListTodayUrl = (email: string) => {
  const date = new Date()
  const year = date.getFullYear() // 년도
  const month = date.getMonth() + 1 // 월
  const day = date.getDate() // 날짜
  return `${endPoint}/users/${email.split('.')[0]}/${
    urlParams.timerList
  }/${year}/${month}/${day}.json`
}
// --------------------- statistics

const userStatisticsTimeline = (email: string, d: string) => {
  const date = new Date(d)
  const year = date.getFullYear() // 년도
  const month = date.getMonth() + 1 // 월
  const day = date.getDate() // 날짜
  return `${endPoint}/users/${email.split('.')[0]}/${
    urlParams.timeLine
  }/${year}/${month}/${day}.json`
}

export const getUrl = (str: 'users' | 'exercises' | 'statistics') => {
  if (str === 'users') {
    return {
      userTimerSettingUrl,
      userTimerListTodayUrl,
    }
  } else if (str === 'exercises') {
    return {}
  } else if (str === 'statistics') {
    return { userStatisticsTimeline }
  }

  return {}
}
