import { useRouter } from 'next/router'
import React from 'react'
import style from './Navigator.module.css'
import { DashboardFilled, DashboardOutlined } from '@ant-design/icons'

const Navigator = () => {
  const router = useRouter()

  return (
    <div className={style.container} >
      { 
        router.pathname === '/' ?
          <DashboardFilled alt='timer-fill' style={styles.icon} />
        :
        <DashboardOutlined alt='timer-outline' style={styles.icon} />
      }
    </div>
  )
}

const styles = {
  icon: {
    fontSize: '26px'
  },
}


export default Navigator