onmessage = (e) => {
  let delay = e.data
  let timer = setTimeout(() => {
    postMessage('123')
    clearTimeout(timer)
  }, delay)
}
