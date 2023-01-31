import { IFood } from './../../components/diet/hooks/useFoodSearch'
import { getDateString, getKoreaDateString } from './../../utils/calender'
import { child, get, ref, set } from 'firebase/database'
import { database } from '../../firebase'
import { IWorkOutFormDataList } from '../../utils/types/exercise'

const getWriteURL = (
  userEmail: string,
  type: string,
  year: string,
  month: string,
  day: string,
  id?: string,
) => {
  const url = `users/${userEmail}/${type}/${year}/${month}/${day}`
  return url
}

const getReadURL = (
  userEmail: string,
  type: string,
  year?: string,
  month?: string,
  day?: string,
) => {
  const date = new Date()
  let url = ''

  if (year && month && day) {
    url = `users/${userEmail}/${type}/${year}/${month}/${day}`
  } else if (year && month) {
    url = `users/${userEmail}/${type}/${year}/${month}`
  } else if (year) {
    url = `users/${userEmail}/${type}/${year}`
  } else {
    url = `users/${userEmail}/${type}/${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`
  }
  return url
}

// 데이터 쓰기
export const writeExerciseData = async (
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
  const url = getWriteURL(newUserEmail[0], 'exercises', year, month, day)
  const updateData = {
    id: data.id,
    targetBody: data.targetBody,
    exercise: data.exercise,
    setTimes: data.setTimes,
  }
  const res: any = await getExerciseData(userEmail)
  const dbRef = ref(db, url)
  if (!res.length) {
    set(dbRef, [updateData])
    return
  }
  set(dbRef, [...res, updateData])
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
  let url = getReadURL(newUserEmail[0], 'exercises', year, month, day)
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

export const writeUserSettingDietData = (userEmail: string, data: any) => {
  const newUserEmail = userEmail.split('.')[0]

  const url = `users/${newUserEmail}/weightGoal`

  const startDate = getKoreaDateString(new Date())
  const endDate = getKoreaDateString(
    new Date(new Date().setDate(new Date().getDate() + data.period * 1)),
  )

  const updateData: any = {
    goal: data.goal === 'increase' ? '증량' : '감량',
    period: data.period + '일',
    startDate,
    endDate,
    startWeight: data.startWeight + 'kg',
    targetWeight: data.targetWeight + 'kg',
    everyWeek: (data.goal === 'increase' ? '+' : '-') + data.everyWeek + 'kg',
    weightList: [],
  }

  const db = ref(database, url)
  set(db, updateData)
}

export const writeUserDietWeightData = (userEmail: string, weight: any) => {
  const newUserEmail = userEmail.split('.')[0]
  const url = `users/${newUserEmail}/weightGoal/weightList`

  const date = getKoreaDateString(new Date())

  const updateData: any = {
    date,
    weight: weight + 'kg',
  }

  const db = ref(database)
  get(child(db, url)).then((snapshot) => {
    if (snapshot.exists()) {
      const temp = [...snapshot.val(), updateData]
      set(ref(database, url), temp)
    }
  })
}

export const writeUserFoodList = (userEmail: string, data: IFood) => {
  const newUserEmail = userEmail.split('.')[0]
  const date = new Date()
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1)
  const day = String(date.getDate())
  const url = getWriteURL(newUserEmail, 'diet', year, month, day)

  const db = ref(database)
  return get(child(db, url)).then((snapshot) => {
    if (snapshot.exists()) {
      const temp = [...snapshot.val(), data]
      set(ref(database, url), temp)
    } else {
      set(ref(database, url), [data])
    }
  })
}
