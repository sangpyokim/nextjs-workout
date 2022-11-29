import React, { useState } from 'react'
import CircularSlider from '@fseehawer/react-circular-slider';

interface ICircleInput {
  setTime: Function,
  setToggle: Function,
  initSec: number,
  maxSec: number,
  style: object,
}

const CircleInput = (
  { setTime, initSec, setToggle, maxSec, style }: ICircleInput
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


    const handleClick = () => {
      setTime(curTime.slice(0, curTime.length-1))
      setToggle(true)
    }

    return (
      <div style={style} onClick={() => handleClick()} >
        <CircularSlider
          onChange={(val: string) => setCurTime(val)}

          width={176}
        
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
    </div>
  )
}

export default CircleInput