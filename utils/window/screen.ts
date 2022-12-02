export const setScreenSize = () => {
  let vh = getScreenSize()
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

export const getScreenSize = () => {
  let vh = window.innerHeight * 0.01

  return vh
}
