import { useState } from 'react'

export const useFlatModal = () => {
  const [open, setOpen] = useState(false)

  return { open, setOpen }
}
