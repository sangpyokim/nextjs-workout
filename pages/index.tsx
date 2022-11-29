import Head from 'next/head'

import { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from './_app'
import { RecoilRoot, useRecoilState } from 'recoil'

// layout
import Layout from '../components/layout/layout'
import NestedLayout from '../components/layout/nested-layout'

// page
import Timer from '../components/timer'
import { useRouter } from 'next/router'

// server-side
import fs from 'fs/promises'
import path from 'path'
import { getExercises } from './api/exercises'
import { exercisesState } from '../utils/recoil/ExercisesState'

export async function getStaticProps() {
  // const filePath = path.join(process.cwd(), 'workoutList.json')
  // const jsonData = await fs.readFile(filePath, { encoding: 'utf-8' })
  const data = await getExercises()

  return {
    props: {
      list: data,
    },
  }
}
const Home: NextPageWithLayout = (props: any) => {
  const router = useRouter()
  return (
    <>
      <Timer />
    </>
  )
}

Home.getLayout = function GetLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

export default Home
