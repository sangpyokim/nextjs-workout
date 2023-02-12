import { useEffect, useState } from 'react'
// 타이머 모드 2개 -> 1. 타이머 1개 2. 타이머 2개 둘이 번갈아가면서 무한반복.
// 1. 상태: 준비 시작 일시정지
// 2. 상태: 준비 시작 일시정지 타이머1,2
// 설정
// 교체
// 총 초, 시:분:초

type TTimerState = 'ready' | 'running' | 'stop' | 'end'
export type TShowMode = 'normal' | 'second' // normal: 시 : 분 : 초, second: 초만 표시
export type TTimerMode = 'single' | 'double'

export const useFlatTimer = () => {
  const [timerState, setTimerState] = useState<TTimerState>('stop')
  const [timerMode, setTimerMode] = useState<TTimerMode>('double')
  const [showMode, setShowMode] = useState<TShowMode>('normal')
  const [constTime, setConstTime] = useState(2)
  const [constSecondTime, setConstSecondTime] = useState(5)

  const [time, setTime] = useState(2) // time에서 변경이 일어나면 바로 normalRemainTime 변경 시키기
  const [secondTime, setSecondTime] = useState(5)
  const [normalRemainTime, setNormalRemainTime] = useState({
    first: '00:00:02',
    second: '00:00:05',
  })

  const toggleShowMode = () => {
    if (showMode === 'normal') setShowMode('second')
    else if (showMode === 'second') setShowMode('normal')
  }
  const toggleTimerMode = () => {
    if (timerMode === 'single') setTimerMode('double')
    else if (timerMode === 'double') setTimerMode('single')
  }
  const init = () => {
    setTime(constTime)
    setSecondTime(constSecondTime)

    const clone = structuredClone(normalRemainTime)
    const strTime1 = _convertTimer(constTime)
    const strTime2 = _convertTimer(constSecondTime)
    clone.first = strTime1
    clone.second = strTime2
    setNormalRemainTime(clone)
  }
  // 타입체크, 분기처리
  const toggleTimerState = () => {
    if (timerState === 'running') setTimerState('stop')
    else if (timerState === 'stop') setTimerState('running')
    else if (timerState === 'end') {
      console.log('A')
      init()
      setTimerState('ready')
    } else {
      setTimerState('running')
    }
  }
  const setTimer = (mode: boolean, type: TShowMode) => {}

  const _countDown = () => {
    if (time === 0) {
      if (secondTime > 0) return _secondCountDown()
      else return setTimerState('end')
    }

    if (showMode === 'normal') {
      const clone = structuredClone(normalRemainTime)
      const strTime = _convertTimer(time - 1)
      clone.first = strTime
      setNormalRemainTime(clone)
    }

    setTime(time - 1)
  }

  const _secondCountDown = () => {
    if (secondTime === 0) return

    if (showMode === 'normal') {
      const clone = structuredClone(normalRemainTime)
      const strTime = _convertTimer(secondTime - 1)
      clone.second = strTime
      setNormalRemainTime(clone)
    }

    setSecondTime(secondTime - 1)
  }

  const _convertTimer = (num: number) => {
    const hours = Math.floor(num / 3600)
    const mins = Math.floor((num % 3600) / 60)
    const sec = Math.floor((num % 3600) % 60)
    const h = hours >= 10 ? hours : `0${hours}`
    const m = mins >= 10 ? mins : `0${mins}`
    const s = sec >= 10 ? sec : `0${sec}`
    return `${h}:${m}:${s}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerState === 'running') {
        _countDown()
      }
      console.log('setInterval')
    }, 1000)

    return () => clearInterval(interval)
  })

  return {
    timerState,
    toggleTimerState,
    timerMode,
    toggleTimerMode,
    showMode,
    toggleShowMode,
    time,
    secondTime,
    normalRemainTime,
  }
}

// 숫자 -> 시 : 분 : 초
// 시분초 -> 숫자
