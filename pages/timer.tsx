import React, { ReactElement } from 'react'
import Layout from '../components/layout/layout'
import NestedLayout from '../components/layout/nested-layout'
import styles from '../styles/Timer.module.css'
import type { NextPageWithLayout } from './_app'
import OTimer from '../components/organisms/OTimer'
import { Inter } from '@next/font/google'
import { getAuth, signOut } from 'firebase/auth'
import { app } from '../firebase'

const inter = Inter()


const Timer = () => {

  const logOut = () => {
    const auth = getAuth(app)
    auth.signOut()
      .then(res => console.log(res))
  }

  return (
      <div className={styles.container} >
        {/* 데이터 가져와서 initSec 변경 시켜주기 */}
        <OTimer initSec={60} />

        <button onClick={() => logOut()} >
          로그아웃
        </button>
      </div>
  )
}


export default Timer