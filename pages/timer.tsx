import React, { ReactElement } from 'react'
import styles from '../styles/Timer.module.css'
import OTimer from '../components/organisms/OTimer'
import { Inter } from '@next/font/google'

const inter = Inter()


const Timer = () => {


  return (
      <div className={styles.container} >
        {/* 데이터 가져와서 initSec 변경 시켜주기 */}
        <OTimer initSec={60} />

 
      </div>
  )
}


export default Timer