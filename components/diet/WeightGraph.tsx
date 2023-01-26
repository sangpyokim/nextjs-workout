import React, { useState } from 'react'
import { useIsFetching } from 'react-query'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { userInfo } from '../../recoil/ExercisesState'
import { useModal } from '../main/hooks/useModal'
import Modal from '../main/Modal'
import DietWeightUpdateModal from './DietWeightUpdateModal'
import { useWeightGraph } from './hooks/useWeightGraph'

const Container = styled.section`
  width: 100%;
  height: 140px;
`
const DDay = styled.div`
  font-size: 14px;
  margin-left: 4px;
  font-weight: 500;
  color: #252525;
`
const GraphWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 80px;

  &:hover {
    cursor: pointer;
  }
`
const ItemWrapper = styled.div`
  height: 12px;
  width: 12px;
`
const ItemWeightWrapper = styled.div<{ view: boolean }>`
  display: ${(props) => (props.view ? 'flex' : 'none')};
  position: relative;
  bottom: 22px;
  left: -12px;
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

const WeightGraph = () => {
  const [user, _] = useRecoilState(userInfo)
  const loading = useIsFetching()
  const { getDDay, getDayList } = useWeightGraph()
  const d_day = getDDay()
  const res = getDayList()

  const { open, setOpen } = useModal()

  if (loading) return <Container></Container>

  if (res.length === 0) return <Container>데이터가 없습니다</Container>

  return (
    <Container>
      <DDay>디데이: {d_day}</DDay>
      <GraphWrapper onClick={() => setOpen(true)}>
        {res.map((day, i) => (
          <React.Fragment key={i}>
            <ItemWrapper>
              <ItemWeightWrapper
                view={
                  new Date().getTime() > new Date(day.date).getTime()
                    ? true
                    : false
                }
              >
                <ItemWeight>{day.weight}</ItemWeight>
              </ItemWeightWrapper>
              <Item
                borderColor={
                  new Date().getTime() > new Date(day.date).getTime()
                    ? true
                    : false
                }
              />
              <ItemDate>
                {day.date.split('. ').slice(1, 3).join('/').split('.')}
              </ItemDate>
            </ItemWrapper>

            {i + 1 === res.length ? null : (
              <Line
                count={res.length}
                bgc={
                  new Date().getTime() > new Date(day.date).getTime()
                    ? true
                    : false
                }
              />
            )}
          </React.Fragment>
        ))}
      </GraphWrapper>

      <DietWeightUpdateModal
        open={open}
        setOpen={setOpen}
        user={user}
      />
    </Container>
  )
}

export default WeightGraph
