import { useRouter } from 'next/router'
import React from 'react'
import style from './Navigator.module.css'
import { DashboardFilled, DashboardOutlined } from '@ant-design/icons'

const Navigator = () => {
  const router = useRouter()
  console.log(router)
  return (
    <div className={style.container} >
      { 
        router.pathname === '/' ?
        <DashboardFilled alt='timer-fill' style={{ fontSize: '24px' }} />
        :
        <DashboardOutlined alt='timer-outline' style={{ fontSize: '24px' }} />
      }
    </div>
  )
}

export default Navigator