import Head from 'next/head'

import { ReactElement } from 'react'
import { NextPageWithLayout } from './_app'

// layout
import Layout from '../components/layout/layout'
import NestedLayout from '../components/layout/nested-layout'

// page
import Timer from '../components/timer'
import { useRouter } from 'next/router'

// server-side

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
