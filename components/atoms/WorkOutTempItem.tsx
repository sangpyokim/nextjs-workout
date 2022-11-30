import React, { FormEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import { IWorkOutTempItemProps } from '../../utils/types/exercise'

const Container = styled.div`
  display: flex;
  width: 100%;
  color: #454545;
  margin-bottom: 8px;
  padding: 4px;
  border-radius: 4px;
  background-color: #eee;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    6px 6px 10px rgba(0, 0, 0, 0.15);
`
const Form = styled.form`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  padding: px;
`
const Section = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  overflow: hidden;
  margin-bottom: 4px;
`
const Label = styled.label`
  margin-right: 4px;
`
const Select = styled.select`
  max-width: 140px;
  min-width: 40px;
`
const Option = styled.option``

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 4px;
`
const Button = styled.button``

const INIT_TIMES_DATA = '5'

const WorkOutTempItem = ({
  index,
  add,
  remove,
  exerciseList,
}: IWorkOutTempItemProps) => {
  const [bodyPart, setBodyPart] = useState('등')
  const targetBodyRef = useRef<HTMLSelectElement>(null)
  const exerciseNameRef = useRef<HTMLSelectElement>(null)
  const timesRef = useRef<HTMLSelectElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    add({
      targetBody: targetBodyRef.current?.value,
      exercise: exerciseNameRef.current?.value,
      setTimes: timesRef.current?.value,
    })
    remove(index)
  }

  const handleDelete = () => {
    remove(index)
  }

  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Section>
          <Label htmlFor="targetBody">운동부위: </Label>
          <select
            ref={targetBodyRef}
            name={'targetBody'}
            defaultValue={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
          >
            <option value="등">등</option>
            <option value="가슴">가슴</option>
            <option value="어깨">어깨</option>
            <option value="팔">팔</option>
            <option value="하체">하체</option>
            <option value="허리">허리</option>
          </select>
        </Section>

        <Section>
          <Label htmlFor="exercise">운동이름: </Label>
          <Select
            name="exercise"
            ref={exerciseNameRef}
          >
            {exerciseList
              .filter((element) => element.bodyPart === bodyPart)
              .map((list) => (
                <option key={list.id}>{list.name}</option>
              ))}
          </Select>
        </Section>

        <Section>
          <Label htmlFor="setTimes">횟수: </Label>
          <Select
            name="setTimes"
            ref={timesRef}
            defaultValue={INIT_TIMES_DATA}
          >
            <Option>1</Option>
            <Option>2</Option>
            <Option>3</Option>
            <Option>4</Option>
            <Option>5</Option>
            <Option>6</Option>
            <Option>7</Option>
          </Select>
        </Section>

        <ButtonWrapper>
          <Button
            type={'reset'}
            onClick={() => handleDelete()}
          >
            삭제
          </Button>
          <Button
            type="submit"
            value={'추가'}
          >
            추가
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

export default WorkOutTempItem
