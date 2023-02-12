import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { exerciseDataList } from '../../recoil/ExercisesState'
import { IExerciseItem } from '../../utils/types/exercise'

const DetailPage = () => {
  const [items, setItems] = useRecoilState(exerciseDataList)
  const route = useRouter()
  return (
    <>
      <div>DetailPage</div>
    </>
  )
}

DetailPage.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default DetailPage
