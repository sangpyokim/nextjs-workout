import { SettingOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { useState } from 'react'
import { useIsFetching } from 'react-query'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { writeUserSettingDietData } from '../../firebase/database/calender'
import { userInfo } from '../../recoil/ExercisesState'
import { useModal } from '../main/hooks/useModal'
import DietUpdateModal from './DietUpdateModal'

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    height: 280px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  margin-bottom: 20px;
  font-family: sans-serif;

  border: 0;
  border-radius: 8px;

  height: 240px;
  width: 100%;
  max-width: 100%;
  /* 뉴몰피즘 */
  background-color: ${({ theme }) => theme.neumorphism.background_color};
  box-shadow: ${({ theme }) => theme.neumorphism.box_shadow};
`
const Title = styled.header`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid #252525;
  margin-bottom: 16px;
`
const MaxTimeSetForm = styled.form`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 8px;
`
const TimeSetInput = styled.input`
  width: 60px;
  height: 18px;
  margin: 8px 0;
  border: 0;
  border-radius: 4px;

  box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.7),
    inset -5px -5px 10px #ddd;
  transition: all 0.2s ease-in-out;

  &:focus {
    box-shadow: inset 1px 1px 2px rgba(255, 255, 255, 0.7),
      inset -1px -1px 2px #ddd;
  }
`

const DynamicWeightGraph = dynamic(() => import('./WeightGraph'), {
  ssr: false,
})
const DynamicGoalList = dynamic(() => import('./GoalList'), {
  ssr: false,
})
const MyWeightCard = () => {
  const [user, _] = useRecoilState(userInfo)
  const { open, setOpen } = useModal()

  if (user.email === '')
    return (
      <Container>
        <Title>
          <div>나의 체중 목표</div>
          <div>&gt;</div>
        </Title>
        <div>로그인을 해주세요</div>
      </Container>
    )

  return (
    <Container>
      <Title>
        <div>나의 체중 목표</div>

        <SettingOutlined onClick={() => setOpen(true)} />
      </Title>

      <DietUpdateModal
        open={open}
        setOpen={setOpen}
        user={user}
      />

      <DynamicWeightGraph />

      <DynamicGoalList />
    </Container>
  )
}

export default MyWeightCard
