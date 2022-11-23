import Head from 'next/head'

import { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import { RecoilRoot, useRecoilState } from 'recoil'


// layout
import Layout from '../components/layout/layout';
import NestedLayout from '../components/layout/nested-layout';

// page
import Timer from './timer';



const Home: NextPageWithLayout = () => {

  return (<Timer />)
}

Home.getLayout = function GetLayout(page: ReactElement) {

  return (
    <RecoilRoot>
      <Layout>
        <NestedLayout>
          {page}
        </NestedLayout>
      </Layout>
    </RecoilRoot>
  )
}

export default Home