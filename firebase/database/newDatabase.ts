import { set, ref } from 'firebase/database'
import { database } from './../../firebase'

export const getMyDB = () => {
  const db = database

  return db
}

export const writeUserData = async (email: string) => {
  const db = getMyDB()

  await set(ref(db, `users/${email.split('@')[0]}/settings`), {
    timer: {
      mode: 'normal',
      type: 'double',
      t1: 90,
      t2: 30,
    },
  })
}
