import React, { FormEvent, ReactElement, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/layout/layout'
import NestedLayout from '../../components/layout/nested-layout'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
`

interface IDietItem {
  name: string
  amount: string
}

enum DIET_ITEM_TYPE {
  'NAME' = 'name',
  'AMOUNT' = 'amount',
}

const Diet = () => {
  const [dietList, setDietList] = useState<IDietItem[]>([])
  const [dietItem, setDietItem] = useState<IDietItem>({ name: '', amount: '' })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validation()
    console.log(e)
    setDietList((prev) => {
      const temp = [...prev]
      temp.push(dietItem)
      return temp
    })
  }
  const validation = () => {
    console.log(dietItem)
  }
  const handleChange = (type: DIET_ITEM_TYPE, val: string) => {
    setDietItem((prev) => {
      const temp = { ...prev }
      temp[type] = val
      return temp
    })
  }

  return (
    <Container>
      {dietList.map((item, i) => (
        <div key={i}>{item.name}</div>
      ))}

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>음식</label>
        <input
          type={'text'}
          onChange={(e) => handleChange(DIET_ITEM_TYPE.NAME, e.target.value)}
        />

        <label>섭취량</label>
        <input
          type={'text'}
          onChange={(e) => handleChange(DIET_ITEM_TYPE.AMOUNT, e.target.value)}
        />

        <button type={'submit'}>추가</button>
      </form>
    </Container>
  )
}

Diet.getLayout = function GetLayout(page: ReactElement) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

export default Diet
