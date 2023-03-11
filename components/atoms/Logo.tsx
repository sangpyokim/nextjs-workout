import { MenuOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import LogoSVG from '../../images/logo.svg'
import useMenu from '../layout/hooks/useMenu'
import SideBar from '../layout/SideBar'

const Logo = ({ user }: any) => {
  const { toggle, setToggle } = useMenu()

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
  font-size: 3rem;
  margin-right: 8px;

  @media ${(props) => props.theme.breakPoint.mobile} {
    display: flex;
  }
`
const LogoImage = styled(Image)`
  height: 50px;
  width: 9rem;

  @media ${(props) => props.theme.breakPoint.mobile} {
    width: 16rem;
  }
`
