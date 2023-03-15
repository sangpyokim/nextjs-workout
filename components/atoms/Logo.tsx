import { MenuOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { Router } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import LogoSVG from '../../images/logo.svg'
import useMenu from '../layout/hooks/useMenu'
import SideBar from '../layout/SideBar'

const Logo = ({ user }: any) => {
  const { toggle, setToggle } = useMenu()

  Router.events.on('routeChangeComplete', () => setToggle(false))

  return (
    <Container>
      <SideBar
        toggle={toggle}
        setToggle={setToggle}
        user={user}
      />

      <WrapImage onClick={() => setToggle(!toggle)} />

      <Link href={'/'}>
        <LogoImage
          alt="logo"
          src={LogoSVG}
          priority={true}
        />
      </Link>
    </Container>
  )
}

export default Logo

const Container = styled.div`
  display: flex;
  align-items: center;

  @media ${(props) => props.theme.breakPoint.mobile} {
    padding: 8px;
  }
`
const WrapImage = styled(MenuOutlined)`
  display: none;
  font-size: ${(props) => props.theme.fontSize.font_lg};
  line-height: ${(props) => props.theme.lineHeight.font_lg};
  margin-right: 8px;

  @media ${(props) => props.theme.breakPoint.mobile} {
    display: flex;
  }
`
const LogoImage = styled(Image)`
  width: 9rem;
  color: var(--header-text-color);
`
