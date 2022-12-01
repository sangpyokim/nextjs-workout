import { useRouter } from 'next/router'
import React from 'react'
import style from './Navigator.module.css'
import {
  DashboardFilled,
  DashboardOutlined,
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
} from '@ant-design/icons'
import Link from 'next/link'

const Navigator = () => {
  const router = useRouter()

  return (
    <div className={style.container}>
      <div className={style.linkWrapper}>
        <Link href={'/'}>
          <div className={style.iconWrapper}>
            {router.pathname === '/' ? (
              <DashboardFilled
                alt="timer-fill"
                style={styles.icon}
              />
            ) : (
              <DashboardOutlined
                alt="timer-outline"
                style={styles.icon}
              />
            )}
            <p className={style.iconName}>타이머</p>
          </div>
        </Link>
      </div>

      <div className={style.linkWrapper}>
        <Link href={'/diet'}>
          <div className={style.iconWrapper}>
            {router.pathname === '/diet' ? (
              <HeartFilled
                alt="heart-fill"
                style={styles.icon}
              />
            ) : (
              <HeartOutlined
                alt="heart-outline"
                style={styles.icon}
              />
            )}
            <p className={style.iconName}>식단</p>
          </div>
        </Link>
      </div>

      <div className={style.linkWrapper}>
        <Link href={'/community'}>
          <div className={style.iconWrapper}>
            <CommentOutlined
              alt="comment-outline"
              style={styles.icon}
            />
            <p className={style.iconName}>커뮤니티</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

const styles = {
  icon: {
    fontSize: '24px',
    marginRight: '6px',
  },
}

export default Navigator
