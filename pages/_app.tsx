import '../styles/globals.css'
import { Fragment, ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { getExercises } from './api/exercises'

// context
import { NotificationContextProvider } from '../store/NotificationContext'

// recoil
import { RecoilRoot } from 'recoil'
import { exerciseDataList, userInfo } from '../utils/recoil/ExercisesState'

// react query
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { getMyAuth } from '../utils/firebase/Auth'
import Header from '../components/organisms/Header'
import Layout from '../components/layout/layout'
import NestedLayout from '../components/layout/nested-layout'
import { GlobalStyle } from '../styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  // const getLayout = Component.getLayout ?? ((page) => page)
  const getLayout = Component.getLayout ?? ((page) => page)
  const queryClient = new QueryClient()

  return getLayout(
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot initializeState={initializeState}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Layout>
              <NestedLayout>
                <Component {...pageProps} />
              </NestedLayout>
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </NotificationContextProvider>,
  )
}

async function initializeState({ set }: any) {
  const data = await getExercises().then((res) =>
    set(exerciseDataList, [...res]),
  )
}
