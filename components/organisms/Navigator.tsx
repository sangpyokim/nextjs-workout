import { useRouter } from 'next/router'
import React from 'react'
import style from './Navigator.module.css'
import { DashboardFilled, DashboardOutlined, HeartOutlined, HeartFilled, CommentOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Navigator = () => {
  const router = useRouter()

  return (
    <div className={style.container} >
      { 
        router.pathname === '/' ?
        <Link href={'/'} >
          <DashboardFilled alt='timer-fill' style={styles.icon} />
        </Link>
        :
        <Link href={'/'} >
          <DashboardOutlined alt='timer-outline' style={styles.icon} />
        </Link>
      }
      { 
        router.pathname === '/diet' ?
        <Link href={'/diet'} >
          <HeartFilled alt='heart-fill' style={styles.icon} />
        </Link>
        :
        <Link href={'/diet'} >
          <HeartOutlined alt='heart-outline' style={styles.icon} />
        </Link>
      }

        <Link href={'/community'} >
          <CommentOutlined alt='comment-outline' style={styles.icon} />
        </Link>
    </div>
  )
}

const styles = {
  icon: {
    fontSize: '26px'
  },
}


export default Navigator