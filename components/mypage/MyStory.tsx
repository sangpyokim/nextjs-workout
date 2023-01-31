import React from 'react'
import { useCalenders } from './hooks/useCalenders'
import { useMyStory } from './hooks/useMyStory'

const MyStory = ({ curFocus }: any) => {
  const { data, isLoading } = useCalenders()

  return (
    <div>{curFocus ? <div></div> : <div>{new Date().getFullYear()}</div>}</div>
  )
}

export default MyStory
