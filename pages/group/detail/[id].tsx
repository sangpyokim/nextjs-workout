import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

// 가입 여부 확인하고, 컴포넌트 로드
type Data = {
  data: string
}

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
  const cookie = context.req ? context.req.headers.cookie : ''
  return {
    props: {
      data: '!23',
    },
  }
}

const _ = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log()
  return <div>_</div>
}

export default _
