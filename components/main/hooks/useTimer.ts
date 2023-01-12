import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { AMaxTime, AStartTime, AStartToggle } from '../recoil/TimerAtom'

export const useTimer = (inputRef: React.RefObject<HTMLInputElement>) => {
  const [aStartToggle, setAStartToggle] = useRecoilState(AStartToggle)
  const [aMaxTime, setAMaxTime] = useRecoilState(AMaxTime)
  const [aStartTime, setAStartTime] = useRecoilState(AStartTime)
  const [isPlaying, setIsPlaying] = useState(false)
  const [keys, setKey] = useState(1)

  const resetTimer = () => {
    setAStartToggle(false)
    setIsPlaying(false)
  }
  const restartTimer = () => {
    setIsPlaying(false)
    setKey((prev) => prev + 1)
  }

  const inputHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    setAStartToggle(true)
    setAMaxTime(Number(inputRef.current?.value))
    setTimeout(() => {
      setAStartToggle(false)
    }, 1)
  }
  const quickSlotHandler = (val: number) => {
    setAStartToggle(true)
    setAStartTime(val)
    setAMaxTime(val)
    setTimeout(() => {
      setAStartToggle(false)
    }, 1)
  }

  return {
    isPlaying,
    setIsPlaying,
    keys,
    aStartToggle,
    setAStartToggle,
    aStartTime,
    aMaxTime,
    inputHandler,
    setAStartTime,
    quickSlotHandler,
    resetTimer,
    restartTimer,
  }
}
