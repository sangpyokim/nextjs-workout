import { child, get, ref } from 'firebase/database'
import { database } from '../../firebase'

export const getTemp = () => {
  const db = database
  const dbRef = ref(db)
  get(child(dbRef, 'users/rlatkdvy12')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val())
    }
  })
}
