import { child, get, push, ref, set, update } from 'firebase/database'
import { database } from '../../firebase'
import { getDateString } from '../calender'
import { IWorkOutFormDataList } from '../types/exercise'

export const getAllExercises = () => {
  return new Promise((res, req) => {
    const dbRef = ref(database)
    get(child(dbRef, 'exercises'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          res(snapshot.val())
        } else {
          req('No data available')
        }
      })
      .catch((error) => {
        req(error)
      })
  })
}

// export const getUserExerciseData = (userId: string) => {
//   const dbRef = ref(database)
// }

export const writeUserExerciseDate = (
  userId: string,
  data: IWorkOutFormDataList,
) => {
  const updateData = {
    id: new Date().getTime(),
    targetBody: data.targetBody,
    exercise: data.exercise,
    times: data.setTimes,
  }
  const newPostKey = push(
    child(ref(database), `users/${userId}/exercise/${updateData.id}`),
  ).key

  const updates: any = {}
  updates[`users/${userId}/exercise/${updateData.id}`] = updateData

  return update(ref(database), updates)
}
