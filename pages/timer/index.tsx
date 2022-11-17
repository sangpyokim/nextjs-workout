import React, { ReactElement } from 'react'
import Layout from '../../components/layout/layout'
import NestedLayout from '../../components/layout/nested-layout'
import Styles from '../../styles/Timer.module.css'
import type { NextPageWithLayout } from '.././_app'
import OTimer from '../../components/organisms/OTimer'
import { Inter } from '@next/font/google'

const inter = Inter()


const Timer: NextPageWithLayout = () => {
  return (
      <div className={Styles.container} >
        {/* 데이터 가져와서 initSec 변경 시켜주기 */}
        <OTimer initSec={60} />
      </div>
  )
}

Timer.getLayout = function getLayout(page: ReactElement) {
  return (
    <div className={`${inter.className} font-sans`} >
      <Layout>
        <NestedLayout>{page}</NestedLayout>
      </Layout>
    </div>
  )
}


export default Timer