import React, { useState } from 'react'
import CircularSlider from '@fseehawer/react-circular-slider';

interface ICircleInput {
  setTime: Function,
  setToggle: Function,
  initSec: number,
  maxSec: number,
}

const CircleInput = (
  { setTime, initSec, setToggle, maxSec }: ICircleInput
  ) => {
    const [ dataArr, setDataArr ] = useState(setData(maxSec))
    const [ curTime, setCurTime ] = useState(initSec?.toString() )

    
    function setData(start: number): Array<string> {
        const res = []
        for (let i = 1; i <= start; i++) {
            res.push(`${i}초`)
        }
        return res
    }

    const onDragEnd = (e: boolean) => {
      if (!e) {
        // IndexDB.writeDB('rlatkdvy12@naver.com', 'record', [{name: 'rlatkdvy12', sec: curTime}], new Date().valueOf())
        setTime(curTime.slice(0, curTime.length-1))
        setToggle(true)
      }
    }
  
    return (
    <CircularSlider
      onChange={(val: string) => setCurTime(val)}
      isDragging={(e: boolean) => onDragEnd(e)}

      width={180}

      data={dataArr}
      dataIndex={initSec-1} 

      progressSize={12}
      progressColorFrom='#0c7de7'
      // progressColorTo='#36cfc9'

      knobColor='black'
      trackColor='#d4d4d4'
      
      label={' '}
      labelFontSize={'16px'}
      labelBottom={true}

      valueFontSize={'40px'}
    >
    </CircularSlider>
  )
}

export default CircleInput