const endPoint =
  'https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app'
const urlParams = {
  diet: 'diet',
  exercises: 'exercises',
  timerSettingValue: 'settings/timer',
  timerList: 'timer/list',
}

const userTimerSettingUrl = (userEmail: string) => {
  return `${endPoint}/users/${userEmail}/${urlParams.timerSettingValue}.json`
}

// type userTimerListUrl = (userEmail: string) => string
const userTimerListTodayUrl = (userEmail: string) => {
  const date = new Date()
  const year = date.getFullYear() // 년도
  const month = date.getMonth() + 1 // 월
  const day = date.getDate() // 날짜
  return `${endPoint}/users/${userEmail}/${urlParams.timerList}/${year}/${month}/${day}.json`
}
// url 분기처리

export const getUrl = (str: 'users' | 'exercises') => {
  if (str === 'users') {
    return {
      userTimerSettingUrl,
      userTimerListTodayUrl,
    }
  } else if (str === 'exercises') {
    return {}
  } else return {}
}
