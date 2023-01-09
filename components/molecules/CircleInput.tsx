import React, { useEffect, useState } from 'react'
import CircularSlider from '@fseehawer/react-circular-slider'
import styled from 'styled-components'
import { AMaxTime, AStartTime, AStartToggle } from '../main/recoil/TimerAtom'
import { useRecoilState } from 'recoil'

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
  style: object
}

const CircleInput = ({ style }: ICircleInput) => {
  const [aStartToggle, setAStartToggle] = useRecoilState(AStartToggle)
  const [aMaxTime, setAMaxTime] = useRecoilState(AMaxTime)
  const [aStartTime, setAStartTime] = useRecoilState(AStartTime)

  return (
    <div style={style}>
      <CircularSlider
        onChange={(val: string) => setAStartTime(Number(val))}
        width={WIDTH}
        // data={dataArr}
        max={aMaxTime}
        min={1}
        dataIndex={aStartTime - 1}
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
      <TouchBox onClick={() => setAStartToggle(true)} />
    </div>
  )
}

export default React.memo(CircleInput)
