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
import { database, fireStore } from '../../firebase'
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
  try {
    await updateDoc(ref, {
      exercises: arrayUnion(data),
    })
  } catch (error) {
    // 오늘 처음 입력한다면 에러 발생 exercises라는 배열이 없어서.
    setDoc(ref, { exercises: [data] })
  }
}

// 유저 id(email 아님), 현재 시간 한국 문자열로 변환
export const getUserExerciseData = async (userId: string, date: string) => {
  const ref = doc(fireStore, 'users', 'data', userId, date)
  let data: IWorkOutFormDataList[] = []
  const docSnap = await getDoc(ref)
  if (docSnap.data()) data = docSnap.data()?.exercises
  return data
}
// 컬렉션 구조: users - data - userId - 날짜 -- 정보
export const getUserAllData = async (userId: string, date: string) => {
  const querySnapshot = await getDocs(
    collection(fireStore, 'users', 'data', userId),
  )

  const exerciseData: any = []

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    exerciseData.push(...doc.data()?.exercises)
  })

  return {
    exerciseData,
    dietData: [],
  }
}
