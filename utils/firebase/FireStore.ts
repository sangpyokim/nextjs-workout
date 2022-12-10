import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { IDummyData } from '../../components/Calender'
import { fireStore } from '../../firebase'
import { IWorkOutFormDataList } from '../types/exercise'

// 데이터 갱신
export const updateUserExerciseData = async (
  userId: string,
  date: string,
  data: IWorkOutFormDataList,
) => {
  const ref = doc(fireStore, 'users', 'data', userId, date)

  await updateDoc(ref, {
    exercises: arrayUnion(data),
  })
}
// 데이터 덮어쓰기
export const setUserExerciseData = async (
  userId: string,
  date: string,
  data: IWorkOutFormDataList,
) => {
  const ref = doc(fireStore, 'users', 'data', userId, date)
  setDoc(ref, data)
}

export const getUserExerciseData = async (userId: string, date: string) => {
  const querySnapshot = await getDocs(
    collection(fireStore, 'users', userId, date),
  )
  let data: IWorkOutFormDataList[] = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data = doc.data().exercises
  })
  return data
}
// 컬렉션 구조: users - data - userId - 날짜 -- 정보
export const getUserAllData = async (userId: string) => {
  const res: IDummyData[] = []
  const q = query(collection(fireStore, 'users', 'data', userId))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const list = {
      date: doc.id,
      workList: doc.data().targetBody,
    }
    res.push(list)
  })

  return res
}
