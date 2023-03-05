import React, { useEffect, useRef } from 'react'
import { useModal } from '../../main/hooks/useModal'

const useHeaderLogIn = () => {
  const { open: rOpen, setOpen: rSetOpen } = useModal()
  const { open: dropDown, setOpen: setDropDown } = useModal()

  const dropDownRef = useRef<HTMLDivElement>(null)
  const idRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onClick = (e: any) => {
      if (
        dropDownRef.current !== null &&
        !dropDownRef.current.contains(e.target)
      ) {
        setDropDown((prev) => !prev)
      }
    }

    if (dropDown) window.addEventListener('click', onClick)

    return () => window.removeEventListener('click', onClick)
  })

  return {
    rOpen,
    rSetOpen,
    dropDown,
    setDropDown,
    dropDownRef,
    idRef,
    passwordRef,
  }
}

export default useHeaderLogIn
