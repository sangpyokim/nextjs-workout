import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { atom, RecoilRoot } from 'recoil'
import { getExercises } from './api/exercises'
import { NotificationContextProvider } from '../store/NotificationContext'
import { tempState } from '../utils/recoil/ExercisesState'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
  const queryClient = new QueryClient()

  return getLayout(
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot initializeState={initializeState}>
          <Component {...pageProps} />
        </RecoilRoot>
      </QueryClientProvider>
    </NotificationContextProvider>,
  )
}

async function initializeState({ set }: any) {
  const data = await getExercises().then((res) => set(tempState, [...res]))
}
