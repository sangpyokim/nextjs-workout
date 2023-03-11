import { useState } from 'react'

const useMenu = () => {
  const [toggle, setToggle] = useState(false)

  return {
    toggle,
    setToggle,
  }
}

export default useMenu
