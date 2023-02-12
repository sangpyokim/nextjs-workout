import React, { ReactElement } from 'react'
import ExerciseList from '../../components/exrtcises/ExerciseList'

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false,
  }
}

const Community = () => {
  return (
    <div>
      <ExerciseList />
    </div>
  )
}
// Community.getLayout = Community
Community.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Community
