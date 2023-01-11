import { QueryClient } from 'react-query'

const queryErrorHandler = (error: unknown) => {
  // 전역 리액트쿼리 에러 핸들러
  console.log('쿼리 에러 발생')
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
})
