import { TIMER_KEY } from './Constants'

// 가져오기
export const getTimerSettingValueInLocalStorage = (key: string) => {
  const val = localStorage.getItem(key)
  if (val) return JSON.parse(val)

  return ''
}
// 덮어스기
export const updateTimerSettingValueInLocalStorage = (
  key: string,
  val: any,
) => {
  localStorage.setItem(key, JSON.stringify(val))
}
