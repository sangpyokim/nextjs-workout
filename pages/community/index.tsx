import React, { ReactElement, useState } from 'react'
import ExerciseList from '../../components/exrtcises/ExerciseList'

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
