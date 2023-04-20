// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import {
  Messaging,
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCNWw5UfU94e8fwOvlEI-oCaf28AD12fwc',
  authDomain: 'workout-21c5f.firebaseapp.com',
  databaseURL:
    'https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'workout-21c5f',
  storageBucket: 'workout-21c5f.appspot.com',
  messagingSenderId: '916319758282',
  appId: '1:916319758282:web:3978732e4fb121f09b9133',
}

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// const messaging = getMessaging(app)

const key =
  'BAyqwt3M2ODBribS4kpMTaKEhgHAv3udhNanPdIBrff82Gd419NTyqbVMp8nUIKWpyVnQ-3t8kYSIBlhEnyuzSo'

export const getTokens = (messaging: Messaging) => {
  return getToken(messaging, { vapidKey: key })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        )
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })
}

export const onMessageListener = (messaging: Messaging) =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
