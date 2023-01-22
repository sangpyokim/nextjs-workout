import { useRouter } from 'next/router'
import React from 'react'
import {
  DashboardFilled,
  DashboardOutlined,
  BankOutlined,
  BankFilled,
  ReconciliationFilled,
  ReconciliationOutlined,
  RestFilled,
  RestOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import styled from 'styled-components'

// icons

const Container = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    width: 200px;
    height: 100vh;
    z-index: 9;
    border-right: 1px solid #d2d2d2;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 90px;
  }

  @media ${({ theme }) => theme.breakPoint.tablet} {
    width: 72px;
    height: 100vh;
    z-index: 9;
    border-right: 1px solid #d2d2d2;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 90px;
  }

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  border-top: 1px solid #d2d2d2;
  position: fixed;
  z-index: 10;
  bottom: 0;
  height: 45px;
  width: 100%;
  padding: 0 16px;
`
const LinkWrapper = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    height: 65px;
  }

  @media ${({ theme }) => theme.breakPoint.tablet} {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    height: 65px;
  }
`
const IconWrapper = styled.div`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    display: flex;
    align-items: center;
  }

  @media ${({ theme }) => theme.breakPoint.tablet} {
    display: flex;
    align-items: center;
  }
`
const IconName = styled.p`
  @media ${({ theme }) => theme.breakPoint.laptop} {
    display: flex;
    font-size: 16px;
    margin-left: 4px;
  }

  @media ${({ theme }) => theme.breakPoint.tablet} {
    display: none;
  }
  display: none;
`
const Navigator = () => {
  const router = useRouter()

  return (
    <Container>
      <LinkWrapper>
        <Link href={'/timer'}>
          <IconWrapper>
            {router.pathname.includes('timer') ? (
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
            <IconName>타이머</IconName>
          </IconWrapper>
        </Link>
      </LinkWrapper>

      <LinkWrapper>
        <Link href={'/diet'}>
          <IconWrapper>
            {router.pathname.includes('diet') ? (
              <RestFilled
                alt="rest-fill"
                style={styles.icon}
              />
            ) : (
              <RestOutlined
                alt="rest-outline"
                style={styles.icon}
              />
            )}
            <IconName>식단</IconName>
          </IconWrapper>
        </Link>
      </LinkWrapper>

      <LinkWrapper>
        <Link href={'/community'}>
          <IconWrapper>
            {router.pathname.includes('community') ? (
              <BankFilled
                alt="learn-exercise-fill"
                style={styles.icon}
              />
            ) : (
              <BankOutlined
                alt="learn-exercise-outline"
                style={styles.icon}
              />
            )}
            <IconName>운동 학습</IconName>
          </IconWrapper>
        </Link>
      </LinkWrapper>

      <LinkWrapper>
        <Link href={'/mypage'}>
          <IconWrapper>
            {router.pathname.includes('mypage') ? (
              <ReconciliationFilled
                alt="reconciliation-filled"
                style={styles.icon}
              />
            ) : (
              <ReconciliationOutlined
                alt="reconciliation-outline"
                style={styles.icon}
              />
            )}
            <IconName>기록</IconName>
          </IconWrapper>
        </Link>
      </LinkWrapper>
    </Container>
  )
}

const styles = {
  icon: {
    fontSize: '24px',
    marginRight: '6px',
  },
}

export default Navigator
