import { getDateString, getKoreaDateString } from './../../utils/calender'
import { child, get, push, ref, set } from 'firebase/database'
import { database } from '../../firebase'
import { IWorkOutFormDataList } from '../../utils/types/exercise'

const getWriteURL = (
  userEmail: string,
  year: string,
  month: string,
  day: string,
  id?: string,
) => {
  const url = `users/${userEmail}/${year}/${month}/${day}/${id}`
  return url
}
const getReadURL = (
  userEmail: string,
  year?: string,
  month?: string,
  day?: string,
) => {
  const date = new Date()
  let url = ''

  if (year && month && day) {
    url = `users/${userEmail}/${year}/${month}/${day}`
  } else if (year && month) {
    url = `users/${userEmail}/${year}/${month}`
  } else if (year) {
    url = `users/${userEmail}/${year}`
  } else {
    url = `users/${userEmail}/${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`
  }
  return url
}

// 데이터 쓰기
export const writeExerciseData = (
  userEmail: string,
  date: Date,
  data: IWorkOutFormDataList,
) => {
  const db = database
  const newUserEmail = userEmail.split('.')
  const dateArr = getKoreaDateString(date)
    .split('.')
    .map((l) => l.trim())
  const [year, month, day] = dateArr
  const url = getWriteURL(newUserEmail[0], year, month, day, data.id)
  const updateData = {
    id: data.id,
    targetBody: data.targetBody,
    exercise: data.exercise,
    setTimes: data.setTimes,
  }

  // push(db, )
  const dbRef = ref(db, url)
  set(dbRef, updateData)
}
// 데이터 읽기
export const getExerciseData = async (
  userEmail: string,
  year?: string,
  month?: string,
  day?: string,
) => {
  // 여기에서 분기처리
  // 년, 월, 일 단위로 데이터 가져오기
  const newUserEmail = userEmail.split('.')
  let url = getReadURL(newUserEmail[0], year, month, day)
  const db = ref(database)

  return new Promise((res, req) => {
    get(child(db, url))
      .then((snapshot) => {
        if (snapshot.exists()) {
          res(snapshot.val())
        } else {
          res({})
        }
      })
      .catch((error) => req(error))
  })
}
