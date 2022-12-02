import React, { useEffect, useState } from 'react'

import styles from '../styles/Timer.module.css'
import OTimer from './organisms/OTimer'
import TodayWorkOutList from './organisms/TodayWorkOutList'

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
