export const convertTimer = (num: number) => {
  const hours = Math.floor(num / 3600)
  const mins = Math.floor((num % 3600) / 60)
  const sec = Math.floor((num % 3600) % 60)
  const h = hours >= 10 ? hours : `0${hours}`
  const m = mins >= 10 ? mins : `0${mins}`
  const s = sec >= 10 ? sec : `0${sec}`
  return `${h}:${m}:${s}`
}
