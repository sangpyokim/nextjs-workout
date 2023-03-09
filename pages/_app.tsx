import '../styles/globals.css'
import { ReactElement, ReactNode, useEffect } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
// context

// recoil
import { RecoilRoot } from 'recoil'

// react query
import { Hydrate, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Layout from '../components/layout/layout'
import NestedLayout from '../components/layout/nested-layout'
import { GlobalStyle } from '../styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { queryClient } from '../react-query/queryClient'

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

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registInit = async () => {
        const registration = await navigator.serviceWorker.register(
          '/service-worker.js',
        )

        registration.waiting?.postMessage('SKIP_WAITING')
      }

      registInit()
    }
  }, [])

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedProps}>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
              <NestedLayout>
                <Component {...pageProps} />
              </NestedLayout>
            </Layout>
          </ThemeProvider>
        </RecoilRoot>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>,
  )
}

// async function initializeState({ set }: any) {
//   const data = await getExercises().then((res) => set(exerciseDataList, res))
// }
