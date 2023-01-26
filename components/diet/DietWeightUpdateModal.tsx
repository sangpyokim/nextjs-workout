import React, { useRef } from 'react'
import styled from 'styled-components'
import { writeUserDietWeightData } from '../../firebase/database/calender'
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

interface IDietWeightUpdateModal {
  open: boolean
  setOpen: Function
  user: any
}

const DietWeightUpdateModal = ({
  open,
  setOpen,
  user,
}: IDietWeightUpdateModal) => {
  const ref = useRef<HTMLInputElement>(null)

  const updateUserDietWeight = (e: React.FormEvent) => {
    e.preventDefault()
    writeUserDietWeightData(user.email, ref.current!.value)
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      header={'현재 체중 기록하기'}
    >
      <MaxTimeSetForm onSubmit={(e) => updateUserDietWeight(e)}>
        <Label>현재 체중 (kg)</Label>
        <TimeSetInput
          ref={ref}
          name="startWeight"
          type="text"
          pattern="[0-9\.]+"
          maxLength={3}
          required
        />
        <button type="submit">기록하기</button>
      </MaxTimeSetForm>
    </Modal>
  )
}

export default DietWeightUpdateModal
