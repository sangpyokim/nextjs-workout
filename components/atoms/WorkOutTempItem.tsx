import React, { ChangeEvent, FormEvent, useState } from 'react'
import { listProps } from '../organisms/TodayWorkOutList';
import styled from 'styled-components'
import dataList from '../../workoutList.json'

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
const Option = styled.option`
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 4px;
`
const Button = styled.button`

`


interface tempListProps extends listProps {
    remove: Function,    
    add: Function,
    tempItem?: listProps,
}

enum FORM_DATA_TYPE {
    'TARGET_BODY' = 'targetBody',
    'EXERCISE' = 'exercise',
    'SET_TIMES' = 'setTimes'
}
const INIT_FORM_DATA = {
    targetBody: 'back',
    exercise: '',
    setTimes: '5',
}

const WorkOutTempItem = ({ index, add, remove, ...tempItem }: tempListProps) => {
    const [ allData, setAllData ] = useState(dataList)
    const [ formData, setFormData ] = useState<listProps>({
        targetBody: INIT_FORM_DATA.targetBody,
        exercise: allData.find(ele => ele.bodyPart === INIT_FORM_DATA.targetBody)!.name,
        setTimes: INIT_FORM_DATA.setTimes,
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        add(formData)
        remove(index)
    }

    const handleDelete = () => {
        setFormData({
            targetBody: 'back',
            exercise: allData.find(ele => ele.bodyPart === formData.targetBody)!.name,
            setTimes: '5',
        })
        remove(index) 
    }

    const handleChange = (type: FORM_DATA_TYPE, val: string) => {
        setFormData(prev => {
            const temp: listProps = {...prev}
            temp[type] = val
            return temp
        })
    }
    return (
        <Container>
            <Form onSubmit={e => handleSubmit(e)} >
                <Section>
                    <Label htmlFor='targetBody' >운동부위: </Label>
                    <select
                        name={'targetBody'}
                        defaultValue={INIT_FORM_DATA.targetBody}
                        onChange={e => handleChange(FORM_DATA_TYPE.TARGET_BODY, e.target.value)}
                        >
                        <option value="back">등</option>
                        <option value="chest">가슴</option>
                        <option value="shoulders">어깨</option>
                        <option value="arms">팔</option>
                        <option value="legs">하체</option>
                        <option value="waist">허리</option>
                    </select>
                </Section>

                        
                <Section>
                    <Label htmlFor='exercise' >운동이름: </Label>
                    <Select 
                        name='exercise'
                        defaultValue={allData.find(ele => ele.bodyPart === formData.targetBody)?.name}
                        onChange={e => handleChange(FORM_DATA_TYPE.EXERCISE, e.target.value)}
                    >
                    {
                        formData && formData.targetBody?.length !== 0 ?
                        allData.filter(ele => ele.bodyPart.includes(formData.targetBody))
                        .map((val) => (
                            <Option key={val.id} value={val.name} >{`${val.name}`}</Option>
                        ))
                    : 
                    null
                    }
                    </Select>
                </Section>


                <Section>
                    <Label htmlFor='setTimes'>횟수: </Label>
                    <Select
                        name='setTimes'
                        defaultValue={INIT_FORM_DATA.setTimes}
                        onChange={e => handleChange(FORM_DATA_TYPE.SET_TIMES, e.target.value)}
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
                    <Button type={'reset'} onClick={() => handleDelete()} >삭제</Button>
                    <Button type='submit' value={'추가'} >추가</Button>
                </ButtonWrapper>
            </Form>
        </Container>
    )
}

export default WorkOutTempItem