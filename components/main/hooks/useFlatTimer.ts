import { useEffect, useRef, useState } from 'react'
import { TIMER_KEY } from '../../../localstorage/Constants'
import {
  getTimerSettingValueInLocalStorage,
  updateTimerSettingValueInLocalStorage,
} from '../../../localstorage/LocalStorage'

// 로컬스토리지에서 값 가져오기
// 로컬스토리지 값 갱신하기
// 서버에서 값 가져오기
// 서버 값 갱신하기

type TTimerState = 'ready' | 'running' | 'stop' | 'end'
export type TShowMode = 'normal' | 'second' // normal: 시 : 분 : 초, second: 초만 표시
export type TTimerMode = 'single' | 'double'

export const useFlatTimer = () => {
  const [timerState, setTimerState] = useState<TTimerState>('stop')
  const [timerMode, setTimerMode] = useState<TTimerMode>('double')
  const [showMode, setShowMode] = useState<TShowMode>('normal')
  const [constTime, setConstTime] = useState(2)
  const [constSecondTime, setConstSecondTime] = useState(5)

  //ref
  const T1Ref = useRef<HTMLInputElement>(null)
  const T2Ref = useRef<HTMLInputElement>(null)

  const [time, setTime] = useState(0) // time에서 변경이 일어나면 바로 normalRemainTime 변경 시키기
  const [secondTime, setSecondTime] = useState(0)
  const [normalRemainTime, setNormalRemainTime] = useState({
    first: '00:00:00',
    second: '00:00:00',
  })

  const onFirstLoad = (
    mode: TShowMode,
    type: TTimerMode,
    t1: number,
    t2: number,
  ) => {
    setShowMode(mode)
    setTimerMode(type)
    _init(t1, t2)
    _constTimeInit(t1, t2)
  }

  const onTimerChange = (type: TTimerMode) => {
    const t1 = Number(T1Ref.current!.value)
    const t2 = Number(T2Ref.current?.value) || 0
    if (Number.isNaN(t1) || Number.isNaN(t2)) return

    _init(t1, t2)
    _constTimeInit(t1, t2)
  }

  const _start = async () => {
    // 1. 로컬 스토리지에서 값 가져오기
    console.log('localstorage check')
    const val = getTimerSettingValueInLocalStorage(TIMER_KEY.timerSetting)
    if (val !== '') {
      onFirstLoad(val.mode, val.type, val.t1, val.t2)
      return
    }

    console.log('server check')
    // 2. 없다면 서버에서 가져오기
    const res = await fetch(
      'https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/users/rlatkdvy12@gmail/settings/timer.json',
    )
    const settings = await res.json()
    onFirstLoad(settings.mode, settings.type, settings.t1, settings.t2)
    // 3. 로컬 스토리지에 값 넣어놓기
    updateTimerSettingValueInLocalStorage(TIMER_KEY.timerSetting, settings)
    return settings
  }

  useEffect(() => {
    _start()
  }, [])

  const toggleShowMode = () => {
    const settings = {
      mode: showMode,
      type: timerMode,
      t1: constTime,
      t2: constSecondTime,
    }

    if (showMode === 'normal') {
      settings.mode = 'second'
      setShowMode('second')
    } else if (showMode === 'second') {
      settings.mode = 'normal'
      setShowMode('normal')
    }

    updateTimerSettingValueInLocalStorage(TIMER_KEY.timerSetting, settings)
  }
  const toggleTimerMode = () => {
    const settings = {
      mode: showMode,
      type: timerMode,
      t1: constTime,
      t2: constSecondTime,
    }

    if (timerMode === 'single') {
      settings.type = 'double'
      setTimerMode('double')
    } else if (timerMode === 'double') {
      settings.type = 'single'
      setTimerMode('single')
    }

    updateTimerSettingValueInLocalStorage(TIMER_KEY.timerSetting, settings)
  }

  const toggleTimerState = () => {
    if (timerState === 'running') setTimerState('stop')
    else if (timerState === 'stop') setTimerState('running')
    else if (timerState === 'end') {
      _init(constTime, constSecondTime)
      setTimerState('ready')
    } else if (timerState === 'ready') {
      // 현재 값이랑 로컬스토리지 값이랑 비교하고 다르다면 서버에 저장
      setTimerState('running')
    }
  }

  const _constTimeInit = (t1: number, t2: number) => {
    setConstTime(t1)
    setConstSecondTime(t2)
  }
  const _init = (t1: number, t2: number) => {
    setTime(t1)
    setSecondTime(t2)

    const clone = JSON.parse(JSON.stringify(normalRemainTime))
    const strTime1 = _convertTimer(t1)
    const strTime2 = _convertTimer(t2)
    clone.first = strTime1
    clone.second = strTime2
    setNormalRemainTime(clone)

    const settings = {
      mode: showMode,
      type: timerMode,
      t1: t1,
      t2: t2,
    }
    updateTimerSettingValueInLocalStorage(TIMER_KEY.timerSetting, settings)
  }
  const _countDown = () => {
    if (time === 0) {
      if (timerMode === 'double' && secondTime > 0) return _secondCountDown()
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
    T1Ref,
    T2Ref,
    constTime,
    setConstTime,
    constSecondTime,
    setConstSecondTime,
    onTimerChange,
  }
}

// 숫자 -> 시 : 분 : 초
// 시분초 -> 숫자
