import React, {
  FormEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import Calender from '../../components/Calender'
import Layout from '../../components/layout/layout'
import NestedLayout from '../../components/layout/nested-layout'
import { getFoodData } from '../../utils/dataFetch'
import { getDateString, initCalender } from '../../utils/calender'
import { collection, doc } from 'firebase/firestore'
import { fireStore } from '../../firebase'
import { authLoading, userInfo } from '../../utils/recoil/ExercisesState'
import { useRecoilState } from 'recoil'
import { getUserAllData } from '../../utils/firebase/FireStore'
import { useQuery } from 'react-query'

const Container = styled.div`
  width: 100%;
  padding: 0 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface IDietItem {
  name: string
  amount: string
}

enum DIET_ITEM_TYPE {
  'NAME' = 'name',
  'AMOUNT' = 'amount',
}
const dummyData = [
  {
    date: '12/6/2022',
    workList: ['가슴', '등'],
  },
  {
    date: '12/5/2022',
    workList: ['등', '가슴'],
  },
]

export async function getStaticProps() {
  return {
    props: {
      calenderList: initCalender(getDateString()),
    }, // will be passed to the page component as props
  }
}
interface ICalender {
  calenderList: number[][]
}
const Diet = ({ calenderList }: ICalender) => {
  const [aLoading, setALoading] = useRecoilState(authLoading)
  const [user, setUser] = useRecoilState(userInfo)

  const [result, setResult] = useState([])
  const [customInput, setCustomInput] = useState(false)
  const [loading, setLoading] = useState(false)

  const foodNameRef = useRef<HTMLInputElement>(null)

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

  const { data, isLoading } = useQuery(
    ['userAllData'],
    () => getUserAllData(user.email.split('@')[0]),
    {
      enabled: !aLoading && user.email.length > 0,
    },
  )

  useEffect(() => {
    // react Query 로 바꾸기
    getUserAllData(user.email.split('@')[0])
  }, [])

  if (loading || aLoading || isLoading) return <div>loading</div>

  return (
    <Container>
      <Calender
        calenderList={calenderList}
        dummyData={data!}
      />

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
    </Container>
  )
}
// Diet.getLayout = Diet
Diet.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default Diet
