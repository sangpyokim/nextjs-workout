import React from 'react'
import styled from 'styled-components'
import styles from './LogInButton.module.css'

type LogInButtonProps = {
  action: Function
  title: string
}

const Container = styled.div`
  background-color: white;
  width: auto;
  padding: 4px;
  border-radius: 2px;
`

const LogInButton = ({ action, title }: LogInButtonProps) => {
  return <Container onClick={() => action()}>{title}</Container>
}

export default LogInButton
