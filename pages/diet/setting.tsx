import React from 'react'
import { useIsFetching } from 'react-query'
import { useWeightGraph } from '../../components/diet/hooks/useWeightGraph'

const Setting = () => {
  const loading = useIsFetching()
  const { data } = useWeightGraph()

  console.log(data, loading)
  return <div>setting</div>
}

export default Setting
