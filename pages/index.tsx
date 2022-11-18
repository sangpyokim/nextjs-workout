import Head from 'next/head'

import { getAuth, getIdToken, GoogleAuthProvider, signInWithPopup, User, UserCredential } from 'firebase/auth';
import { app } from '../firebase';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Landing from './landing';
import Timer from './timer';
import { NextPageWithLayout } from './_app';
import NestedLayout from '../components/layout/nested-layout';
import Layout from '../components/layout/layout';
import FullHeight from '../components/layout/full-height';



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
  const auth = getAuth(app)
  console.log(auth.currentUser)
  
  if (!auth.currentUser) return <FullHeight>{page}</FullHeight>

  return (
    <Layout>
      <NestedLayout>
        {page}
      </NestedLayout>
    </Layout>
  )
}

export default Home