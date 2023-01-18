import React from 'react'
import { useCalenders } from './hooks/useCalenders'

const MyStory = () => {
  const { data, isLoading } = useCalenders()
  console.log(data)
  return <div>MyStory</div>
}

export default MyStory
