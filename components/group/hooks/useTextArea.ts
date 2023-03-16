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
    [keyDown],
  )
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.nativeEvent.isComposing) return

      const key = e.key
      const newSet = new Set(keyDown)
      newSet.add(key)
      setKeyDown(newSet)

      if (key === 'Enter') {
        if (!keyDown.has('Shift')) {
          e.preventDefault()
          if (text === '') return

          onSubmitHandler(text)
          setText('')
          return
        }
      }
    },
    [text, keyDown, onSubmitHandler],
  )
  const handleTextChange = (e: any) => {
    setText(e.target.value)
  }
  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmitHandler(text)
  }

  return {
    text,
    handleTextChange,
    handleKeyUp,
    handleKeyPress,
    onsubmit,
  }
}

export default useTextArea
