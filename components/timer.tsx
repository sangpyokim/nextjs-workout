import React, { useEffect, useState } from 'react'
import { database, fireStore } from '../firebase'
import {
  child,
  get,
  ref,
  orderByChild,
  onValue,
  equalTo,
  orderByValue,
  orderByKey,
  limitToFirst,
  orderByPriority,
  query,
} from 'firebase/database'

import styles from '../styles/Timer.module.css'
import OTimer from './organisms/OTimer'
import TodayWorkOutList from './organisms/TodayWorkOutList'
import { getFoodData } from '../utils/dataFetch'

// & desc_kor=바 & pageNo=1 &

const Timer = () => {
  return (
    <div className={styles.container}>
      {/* 데이터 가져와서 initSec 변경 시켜주기 */}
      <div className={styles.timerWrapper}>
        <OTimer initSec={60} />
      </div>

      <div className={styles.listWrapper}>
        <TodayWorkOutList />
      </div>
    </div>
  )
}

export default Timer
