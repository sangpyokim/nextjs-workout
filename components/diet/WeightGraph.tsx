import React from 'react'
import styled from 'styled-components'
import { getKoreaDateString } from '../../utils/calender'
import { useWeightGraph } from './hooks/useWeightGraph'

const Container = styled.section`
  width: 100%;
  height: 140px;
`
const GraphWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 80px;
`
const ItemWrapper = styled.div`
  height: 12px;
  width: 12px;
`
const ItemWeightWrapper = styled.div<{ view: boolean }>`
  display: ${(props) => (props.view ? 'flex' : 'none')};
  position: relative;
  bottom: 22px;
  left: -8px;
  height: 0px;
  width: 0px;
`
const ItemWeight = styled.div`
  background-color: #252525;
  height: 16px;

  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
`
const Item = styled.div<{ borderColor: boolean }>`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.borderColor ? props.theme.colors.orange : props.theme.colors.gray};
  background-color: #fff;
`
const ItemDate = styled.div`
  margin-top: 4px;
  width: 50px;
  color: #252525;
  font-size: 12px;
`
const Line = styled.div<{ bgc: boolean; count: number }>`
  height: 4px;
  width: ${(props) => String(90 / props.count) + '%'};
  background-color: ${(props) =>
    props.bgc ? props.theme.colors.orange : props.theme.colors.gray};
`

// 시작 지점
// 끝 지점
// 현재 지점
// 지점 개수 = 끝 / 8
const start1 = `2023. 1. 1`
const end1 = `2023. 2. 2`

const WeightGraph = ({ start = start1, end = end1 }: any) => {
  const { getDateDiff, getDayList } = useWeightGraph()
  const diff = getDateDiff(start, end)

  const dayList = getDayList(start, end, diff)

  return (
    <Container>
      <div>디데이: {diff}</div>

      <GraphWrapper>
        {dayList.map((day, i) => (
          <>
            <ItemWrapper>
              <ItemWeightWrapper
                view={
                  new Date().getTime() > new Date(day).getTime() ? true : false
                }
              >
                <ItemWeight>64kg</ItemWeight>
              </ItemWeightWrapper>
              <Item
                borderColor={
                  new Date().getTime() > new Date(day).getTime() ? true : false
                }
              />
              <ItemDate>
                {dayList[i].split('. ').slice(1, 3).join('/').split('.')}
              </ItemDate>
            </ItemWrapper>

            {i + 1 === dayList.length ? null : (
              <Line
                count={dayList.length}
                bgc={
                  new Date().getTime() > new Date(day).getTime() ? true : false
                }
              />
            )}
          </>
        ))}
      </GraphWrapper>
    </Container>
  )
}

export default WeightGraph
