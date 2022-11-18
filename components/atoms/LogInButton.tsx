import React from 'react'
import styles from './LogInButton.module.css'

type LogInButtonProps = {
    action: Function,
    title: string
}

const LogInButton = ({ action, title }: LogInButtonProps) => {
  return (
    <div 
        className={styles.container}
        onClick={() => action()} 
    >
        {title}
    </div>
  )
}

export default LogInButton