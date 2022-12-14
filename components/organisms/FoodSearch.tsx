import React, { FormEvent, useRef, useState } from 'react'
import { getFoodData } from '../../utils/dataFetch'

const FoodSearch = () => {
  const foodNameRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])
  const [customInput, setCustomInput] = useState(false)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setCustomInput(false)
    await getFoodData(foodNameRef.current!.value)
      .then((res) => {
        if (res) setResult(res)
        else {
          // 검색결과가 없으면 직접입력
          setCustomInput(true)
        }
        console.log(res)
      })
      .catch((e) => {
        setResult([])
        setCustomInput(true)
      })
      .finally(() => setLoading(false))
  }

  if (loading) return <div>loading</div>

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>음식</label>
        <input
          type={'text'}
          ref={foodNameRef}
        />

        <label>섭취량</label>
        <input type={'text'} />

        <button type={'submit'}>추가</button>
      </form>

      {customInput && <div>직접입력하시겠습니까</div>}

      {result.map((res: any, i) => (
        <div
          key={i}
          style={{ display: 'flex' }}
        >
          <div>{res.DESC_KOR}</div>
          <div>{res.SERVING_WT}</div>
          <div>{res.NUTR_CONT1}</div>
          <div>{res.NUTR_CONT2}</div>
          <div>{res.NUTR_CONT3}</div>
          <div>{res.NUTR_CONT4}</div>
        </div>
      ))}
    </div>
  )
}

export default FoodSearch
