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

// const userStatisticsTimeline = (email: string, d: string) => {
//   const date = new Date(d)
//   const year = date.getFullYear() // 년도
//   const month = date.getMonth() + 1 // 월
//   const day = date.getDate() // 날짜
//   return `${endPoint}/users/${email.split('.')[0]}/${
//     urlParams.timeLine
//   }/${year}/${month}/${day}.json`
// }

function userStatisticsTimeline(email: string, year: Date): string
function userStatisticsTimeline(email: string, year: string): string
function userStatisticsTimeline(
  email: string,
  year: string,
  month: string,
): string
function userStatisticsTimeline(
  email: string,
  year: string,
  month: string,
  date: string,
): string

function userStatisticsTimeline(
  email: string,
  year: string | Date,
  month?: string,
  date?: string,
): string {
  if (year instanceof Date && !Number.isNaN(year)) {
    return `${endPoint}/users/${email.split('.')[0]}/${
      urlParams.timeLine
    }/${year.getFullYear()}/${year.getMonth() + 1}/${year.getDate()}.json`
  } else if (!month) {
    return `${endPoint}/users/${email.split('.')[0]}/${
      urlParams.timeLine
    }/${year}.json`
  } else if (!date) {
    return `${endPoint}/users/${email.split('.')[0]}/${
      urlParams.timeLine
    }/${year}/${month}.json`
  } else
    return `${endPoint}/users/${email.split('.')[0]}/${
      urlParams.timeLine
    }/${year}/${month}/${date}.json`
}

// ------------------ groups
// create
function createGroup(email: string) {
  const groupUrl = `${endPoint}/groups.json`
  const userGroupUrl = `${endPoint}/users/${email.split('.')[0]}/groups.json`

  return {
    groupUrl,
    userGroupUrl,
  }
}
function getMyGroup(email: string) {
  const myGroupUrl = `${endPoint}/users/${email.split('.')[0]}/groups.json`
  return myGroupUrl
}
function getAllGroup() {
  const allGroupUrl = `${endPoint}/groups.json`
  return allGroupUrl
}
function getGroup(groupID: string) {
  const groupUrl = `${endPoint}/groups/${groupID}.json`
  return groupUrl
}
function joinGroup(groupID: string) {
  const groupUrl = `${endPoint}/groups/${groupID}/users.json`
  return groupUrl
}
export const getUrl = (
  str: 'users' | 'exercises' | 'statistics' | 'groups',
) => {
  if (str === 'users') {
    return {
      userTimerSettingUrl,
      userTimerListTodayUrl,
    }
  } else if (str === 'exercises') {
    return {}
  } else if (str === 'statistics') {
    return {
      userStatisticsTimeline,
    }
  } else if (str === 'groups') {
    return {
      createGroup,
      getMyGroup,
      getAllGroup,
      getGroup,
      joinGroup,
    }
  }

  return {}
}
