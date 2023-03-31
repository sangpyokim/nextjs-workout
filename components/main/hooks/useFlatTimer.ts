import {
  ARemainTime,
  ASelectedWorkOutListItem,
  AWorkOutList,
  userInfo,
} from '../../../recoil/all-atom'
import { useEffect, useRef, useState } from 'react'
import { TIMER_KEY } from '../../../localstorage/Constants'
import {
  getTimerSettingValueInLocalStorage,
  updateTimerSettingValueInLocalStorage,
} from '../../../localstorage/LocalStorage'
import { useRecoilState } from 'recoil'
import { ATimerState } from '../../../recoil/all-atom'
import { convertTimer } from '../../../utils/time'
import {
  pushWorkOutItemInTimeLine,
  updateWorkOutList,
  writeUserData,
} from '../../../firebase/database/newDatabase'
import {
  ITimeLineItem,
  TShowMode,
  TTimerMode,
  TTimerState,
  WorkOutListItem,
} from '../../../interface'

export const useFlatTimer = () => {
  const [user, setUser] = useRecoilState(userInfo)
  const [list, setList] = useRecoilState(AWorkOutList)
  const [timerState, setTimerState] = useRecoilState(ATimerState)
  const [selectedItem, setSelectedItem] = useRecoilState(
    ASelectedWorkOutListItem,
  )
  const [normalRemainTime, setNormalRemainTime] = useRecoilState(ARemainTime)

  const [timerMode, setTimerMode] = useState<TTimerMode>('double')
  const [showMode, setShowMode] = useState<TShowMode>('normal')
  const [constTime, setConstTime] = useState(0)
  const [constSecondTime, setConstSecondTime] = useState(0)

  //ref
  const T1Ref = useRef<HTMLInputElement>(null)
  const T2Ref = useRef<HTMLInputElement>(null)

  const [time, setTime] = useState(0) // time에서 변경이 일어나면 바로 normalRemainTime 변경 시키기
  const [secondTime, setSecondTime] = useState(0)

  const onFirstLoad = (
    mode: TShowMode,
    type: TTimerMode,
    t1: number,
    t2: number,
  ) => {
    setShowMode(mode)
    setTimerMode(type)
    // 현재시간 로컬스토리지에서 확인, 로컬스토리지에 값이있으면 const 시간빼고 바꿔주기
    const LT1 = localStorage.getItem(TIMER_KEY.firstTime)
    const LT2 = localStorage.getItem(TIMER_KEY.secondTime)

    if (LT1 && LT2) _init(Number(LT1), Number(LT2))
    else if (LT1 && !LT2) _init(Number(LT1), t2)
    else _init(t1, t2)

    const res = localStorage.getItem(TIMER_KEY.timerSetting)
    _constTimeInit(t1, t2)
  }

  const onTimerChange = (type: TTimerMode) => {
    const t1 = Number(T1Ref.current!.value)
    const t2 = Number(T2Ref.current?.value) || 0
    if (Number.isNaN(t1) || Number.isNaN(t2)) return

    _init(t1, t2)
    _constTimeInit(t1, t2)
    const timer = {
      mode: showMode,
      type: timerMode,
      t1,
      t2,
    }
    const INITIAL_VALUE = {
      settings: {
        timer,
      },
    }
    writeUserData(user.email, INITIAL_VALUE)
  }

  const _start = async () => {
    setTimeout(() => {
      const settings = getTimerSettingValueInLocalStorage(
        TIMER_KEY.timerSetting,
      )
      onFirstLoad(settings.mode, settings.type, settings.t1, settings.t2)
    }, 0)
  }

  useEffect(() => {
    _start()
  }, [user.email, user.displayName])

  const toggleShowMode = () => {
    const timer = {
      mode: showMode,
      type: timerMode,
      t1: constTime,
      t2: constSecondTime,
    }

    if (showMode === 'normal') {
      timer.mode = 'second'
      setShowMode('second')
    } else if (showMode === 'second') {
      timer.mode = 'normal'
      setShowMode('normal')
    }

    updateTimerSettingValueInLocalStorage(TIMER_KEY.timerSetting, timer)

    const INITIAL_VALUE = {
      settings: {
        timer,
      },
    }
    writeUserData(user.email, INITIAL_VALUE)
  }
  const toggleTimerMode = () => {
    const timer = {
      mode: showMode,
      type: timerMode,
      t1: constTime,
      t2: constSecondTime,
    }

    if (timerMode === 'single') {
      timer.type = 'double'
      setTimerMode('double')
    } else if (timerMode === 'double') {
      timer.type = 'single'
      setTimerMode('single')
    }

    updateTimerSettingValueInLocalStorage(TIMER_KEY.timerSetting, timer)

    const INITIAL_VALUE = {
      settings: {
        timer,
      },
    }
    writeUserData(user.email, INITIAL_VALUE)
  }

  const toggleTimerState = () => {
    if (timerState === 'running') {
      setTimerState('stop')
      _pushTimeLine('stop')
    } else if (timerState === 'stop') {
      setTimerState('running')
      _pushTimeLine('running')
    } else if (timerState === 'end') {
      _init(constTime, constSecondTime)
      setTimerState('ready')
    } else if (timerState === 'ready') {
      setTimerState('running')
      _pushTimeLine('running')
    }
  }

  const _pushTimeLine = async (type: TTimerState) => {
    const item: ITimeLineItem = {
      title: selectedItem?.title || '타이머',
      type,
      time: new Date().toString(),
    }
    await pushWorkOutItemInTimeLine(user.email, item)
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
    // updateTimerSettingValueInLocalStorage(TIMER_KEY.timerSetting, settings)
  }
  const _countDown = () => {
    if (time === 0) {
      if (timerMode === 'double' && secondTime > 0) return _secondCountDown()
      else return _countDownEnd()
    }

    if (showMode === 'normal') {
      const clone = JSON.parse(JSON.stringify(normalRemainTime))
      const strTime = _convertTimer(time - 1)
      clone.first = strTime
      setNormalRemainTime(clone)
    }
    // ------------------- 리스트 풋하기
    updateWorkOutList(user.email, list)

    // 리스트에서 선택된거 찾고 복사하고 변경시키고 덮어쓰기
    setTime(time - 1)
    _updateFirstTimeLocalStorage()
    // 쉬는 시간 포함?
    _updateList()
  }
  const _updateFirstTimeLocalStorage = () => {
    localStorage.setItem(TIMER_KEY.firstTime, String(time))
  }
  const _updateSecondTimeLocalStorage = () => {
    localStorage.setItem(TIMER_KEY.secondTime, String(secondTime))
  }
  const _countDownEnd = () => {
    setTimerState('end')
    _updateSetList()
  }
  const _updateSetList = () => {
    const itemIndex = list.findIndex((ele) => ele.id === selectedItem?.id)
    if (itemIndex !== -1) {
      const newList = list.map((item, index) => {
        if (itemIndex === index) {
          const newObj: WorkOutListItem = {
            timeNum: item.timeNum,
            time: item.time,
            id: item.id,
            title: item.title,
            set: item.set + 1,
          }
          setSelectedItem(newObj)
          return newObj
        }
        return item
      })

      setList(newList)
    }
  }
  const _updateList = () => {
    const itemIndex = list.findIndex((ele) => ele.id === selectedItem?.id)
    if (itemIndex !== -1) {
      const newList = list.map((item, index) => {
        if (itemIndex === index) {
          const newObj: WorkOutListItem = {
            timeNum: item.timeNum + 1,
            time: convertTimer(item.timeNum + 1),
            id: item.id,
            title: item.title,
            set: item.set,
          }
          setSelectedItem(newObj)
          return newObj
        }
        return item
      })
      setList(newList)
    }
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
    // --------------------------------------------------
    // 쉬는 시간 포함
    _updateList()
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
  const onClickResetButton = () => {
    _init(constTime, constSecondTime)
    setTimerState('ready')
    localStorage.setItem(TIMER_KEY.firstTime, String(constTime))
    localStorage.setItem(TIMER_KEY.secondTime, String(constSecondTime))
  }

  useEffect(() => {
    const worker = new Worker(
      new URL('../../../workers/flatTimerSetTimeout.js', import.meta.url),
    )
    worker.postMessage(1000)
    worker.onmessage = (e) => {
      if (timerState === 'running') {
        _countDown()
      }
    }
    return () => worker.terminate()
  })

  return {
    timerState,
    setTimerState,
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
    selectedItem,
    onClickResetButton,
  }
}

// 숫자 -> 시 : 분 : 초
// 시분초 -> 숫자
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(() => {})

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback) savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
