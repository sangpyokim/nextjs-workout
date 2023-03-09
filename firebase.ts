// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
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
