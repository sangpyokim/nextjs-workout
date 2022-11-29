import type { NextApiRequest, NextApiResponse } from 'next'

export const getExercises = async () => {
  const data = await fetch(
    'https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app/exercises.json',
  )
  const json = data.json()
  return json
}

const exerciseHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const data = await getExercises()

    res.status(200).json(data)
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}

export default exerciseHandler
