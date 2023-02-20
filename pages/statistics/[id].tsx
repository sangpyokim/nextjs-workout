import React from 'react'
import Calender from '../../components/statistics/Calender'
import { useCalender } from '../../components/statistics/hooks/useCalender'
import { CalenderMaker } from '../../utils/calender'
import { initCalender } from '../../utils/calender'

const _ = () => {
  const { initCalender } = useCalender()

  return (
    <div>
      <Calender calender={initCalender()} />
    </div>
  )
}

export default _
