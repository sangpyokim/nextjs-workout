import React, { useCallback, useRef, useState } from 'react'

const useTextArea = (onSubmitHandler: Function) => {
  const [text, setText] = useState('')
  const [keyDown, setKeyDown] = useState(new Set())

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const key = e.key
      const newSet = new Set(keyDown)
      newSet.delete(key)
      setKeyDown(newSet)
    },
    [],
  )
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key
    const newSet = new Set(keyDown)
    newSet.add(key)
    setKeyDown(newSet)

    if (key === 'Enter') {
      if (!keyDown.has('Shift')) {
        e.preventDefault()
        onSubmitHandler(text)
        return
      }
    }
  }
  const handleTextChange = (e: any) => {
    setText(e.target.value)
  }

  return {
    text,
    handleTextChange,
    handleKeyUp,
    handleKeyPress,
  }
}

export default useTextArea
