import React from 'react'
import styled from 'styled-components'
import { ICalender } from './hooks/useCalender'

const Container = styled.div`
  color: white;
  width: 100%;
  min-height: 50vh;
  background-color: ${(props) => props.theme.colors.gray};
`

const Calender = ({ calender }: ICalender) => {
  return <Container>Calender</Container>
}

export default Calender
