import Head from 'next/head'

import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

import styles from '../styles/Timer.module.css'
// layout
import Layout from '../components/layout/layout'
import NestedLayout from '../components/layout/nested-layout'

// page
import OTimer from '../components/organisms/OTimer'
import TodayWorkOutList from '../components/organisms/TodayWorkOutList'

// server-side

const Home: NextPageWithLayout = (props: any) => {
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
// Home.getLayout = Home
Home.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Home
