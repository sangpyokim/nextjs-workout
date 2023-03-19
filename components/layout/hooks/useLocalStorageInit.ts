import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { getTimerSettingValue } from '../../../firebase/database/newDatabase'
import { INITIAL_VALUE } from '../../../firebase/initialValue'
import { TIMER_KEY } from '../../../localstorage/Constants'
import { userInfo } from '../../../recoil/all-atom'

const useLocalStorageInit = () => {
  const [user, setUser] = useRecoilState(userInfo)

  const init = () => {
    _userLocalStorage()
    _timerLocalStorage()
  }

  const _userLocalStorage = () => {
    if (user.email === '') {
      localStorage.removeItem(TIMER_KEY.userEmail)
      return
    }

    const userEmail = _getLocalStorage(user.email)
    if (!userEmail) {
      _setLocalStorage(TIMER_KEY.userEmail, user.email)
    }
  }

  const _timerLocalStorage = () => {
    if (user.email === '') {
      const res = _getLocalStorage(TIMER_KEY.timerSetting)
      if (!res) {
        _setLocalStorage(TIMER_KEY.timerSetting, INITIAL_VALUE.settings.timer)
        return
      }
      return
    }

    _loggedIn()
  }

  const _loggedIn = async () => {
    const timerSettingValue = _getLocalStorage(TIMER_KEY.timerSetting)
    if (!timerSettingValue) {
      const settings = await getTimerSettingValue(user.email)
      _setLocalStorage(TIMER_KEY.timerSetting, settings)
      return
    }
  }

  const _getLocalStorage = (key: string) => {
    return localStorage.getItem(key)
  }
  const _setLocalStorage = (key: string, val: any) => {
    const value = JSON.stringify(val)
    localStorage.setItem(key, value)
  }

  useEffect(() => {
    init()
  }, [user.email, user.displayName])

  return {}
}

export default useLocalStorageInit
