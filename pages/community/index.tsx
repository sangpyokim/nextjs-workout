import React, { ReactElement, useState } from 'react'
import ExerciseList from '../../components/exrtcises/ExerciseList'
import Layout from '../../components/layout/layout'
import NestedLayout from '../../components/layout/nested-layout'

const Community = () => {
  return (
    <div>
      <ExerciseList />
    </div>
  )
}

Community.getLayout = function GetLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

export default Community
