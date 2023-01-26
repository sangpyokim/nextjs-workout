import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { writeUserSettingDietData } from '../../firebase/database/calender'
import { userInfo } from '../../recoil/ExercisesState'
import { useModal } from '../main/hooks/useModal'
import Modal from '../main/Modal'

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
const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`

interface IDietUpdateModal {
  open: boolean
  setOpen: Function
  user: any
}

const DietUpdateModal = ({ open, setOpen, user }: IDietUpdateModal) => {
  const [formData, setFormData] = useState<any>({
    goal: '',
    targetWeight: '',
    period: '',
    everyWeek: '',
    startWeight: '',
  })

  const handleInputChange = (event: any) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setFormData((prev: any) => {
      let temp = formData
      temp[name] = value
      return temp
    })
  }

  const summitHandeler = (e: React.FormEvent) => {
    e.preventDefault()
    writeUserSettingDietData(user.email, formData)
  }
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      header="체중 목표 수정하기"
    >
      <MaxTimeSetForm onSubmit={(e) => summitHandeler(e)}>
        <FormItem>
          <Label>목표</Label>
          <div onChange={(e) => handleInputChange(e)}>
            <input
              type="radio"
              name="goal"
              value="increase"
              id="increase"
            />
            <Label htmlFor="increase">증량</Label>
            <input
              type="radio"
              name="goal"
              value="decrease"
              id="decrease"
            />
            <Label htmlFor="decrease">감량</Label>
          </div>
        </FormItem>

        <FormItem onChange={(e) => handleInputChange(e)}>
          <Label>현재 체중 (kg)</Label>
          <TimeSetInput
            name="startWeight"
            type="text"
            pattern="[0-9\.]+"
            maxLength={3}
            required
          />
        </FormItem>

        <FormItem onChange={(e) => handleInputChange(e)}>
          <Label>목표 체중 (kg)</Label>
          <TimeSetInput
            name="targetWeight"
            type="text"
            pattern="[0-9\.]+"
            maxLength={3}
            required
          />
        </FormItem>

        <FormItem onChange={(e) => handleInputChange(e)}>
          <Label>목표 기간 (일)</Label>
          <TimeSetInput
            name="period"
            type="text"
            pattern="[0-9]+"
            maxLength={3}
            required
          />
        </FormItem>

        <FormItem onChange={(e) => handleInputChange(e)}>
          <Label>매주 목표 (kg)</Label>
          <TimeSetInput
            name="everyWeek"
            type="text"
            pattern="[0-9\.]+"
            maxLength={3}
            required
          />
        </FormItem>
        <button type="submit">수정하기</button>
      </MaxTimeSetForm>
    </Modal>
  )
}

export default DietUpdateModal
