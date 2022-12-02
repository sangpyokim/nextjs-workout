import React, { useState } from 'react'
import CircularSlider from '@fseehawer/react-circular-slider'
import styled from 'styled-components'

const WIDTH = 176

const TouchBox = styled.div`
  width: 88px;
  height: 88px;
  background-color: transparent;
  z-index: 10;
  position: relative;
  top: -${WIDTH / 2}px;
  transform: translateY(-50%);
  left: ${WIDTH / 4}px;
`

interface ICircleInput {
  setTime: Function
  setToggle: Function
  initSec: number
  maxSec: number
  style: object
}

const CircleInput = ({
  setTime,
  initSec,
  setToggle,
  maxSec,
  style,
}: ICircleInput) => {
  const [dataArr, setDataArr] = useState(setData(maxSec))
  const [curTime, setCurTime] = useState(initSec?.toString())

  function setData(start: number): Array<string> {
    const res = []
    for (let i = 1; i <= start; i++) {
      res.push(`${i}초`)
    }
    return res
  }

  const handleClick = () => {
    setTime(curTime.slice(0, curTime.length - 1))
    setToggle(true)
  }

  return (
    <div style={style}>
      <CircularSlider
        onChange={(val: string) => setCurTime(val)}
        width={WIDTH}
        data={dataArr}
        dataIndex={initSec - 1}
        progressSize={12}
        progressColorFrom="#0c7de7"
        // progressColorTo='#36cfc9'

        knobColor="black"
        trackColor="#d4d4d4"
        label={' '}
        labelFontSize={'16px'}
        labelBottom={true}
        valueFontSize={'40px'}
      />
      <TouchBox onClick={() => handleClick()} />
    </div>
  )
}

export default CircleInput
