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
const END_POINT = 'https://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1'
const KEY =
  'CPVzoQ8fogwnLrZrXLoVKsflk0KklcGJKGL0%2Bcvz6HRqWDbXn8bkuItH9l8I%2F7cZ9EmN7oSPxlbe4dQfszTMVw%3D%3D'
const TYPE = 'json'

const URL = `${END_POINT}/getFoodNtrItdntList1?ServiceKey=${KEY}&desc_kor=&type=${TYPE}`

const Home: NextPageWithLayout = (props: any) => {
  const router = useRouter()
  // const data = fetch(URL)
  //   .then((res) => res.json())
  //   .then((res) => console.log(res))
  //   .catch((e) => console.error(e))

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
