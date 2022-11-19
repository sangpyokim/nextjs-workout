import Head from 'next/head'

import { getAuth, getIdToken, GoogleAuthProvider, signInWithPopup, User, UserCredential } from 'firebase/auth';
import { app } from '../firebase';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from './_app';



// layout
import Layout from '../components/layout/layout';
import NestedLayout from '../components/layout/nested-layout';
import FullHeightLayout from '../components/layout/full-height-layout';

// page
import Timer from './timer';
import Landing from './landing';



const Home: NextPageWithLayout = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loading, setLoading ] = useState(true)

  


  useEffect(() => {
    const auth = getAuth(app)
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
      }
      setLoading(false)
    })

  })

  if (loading) return <div>loading</div>

  if (isLoggedIn) {
    return <Timer />
  }
  else {
    return <Landing />
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  const [ user, setUser ] = useState(false)

  useEffect(() => {
    const auth = getAuth(app)
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setUser(false)
      } else {
        setUser(true)
      }
    })
  })

  if (!user) return <FullHeightLayout>{page}</FullHeightLayout>

  return (
    <Layout>
      <NestedLayout>
        {page}
      </NestedLayout>
    </Layout>
  )
}

export default Home