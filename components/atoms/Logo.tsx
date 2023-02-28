import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import LogoSVG from '../../images/logo.svg'

const LogoImage = styled(Image)`
  height: 50px;
  width: 9rem;

  @media ${(props) => props.theme.breakPoint.mobile} {
    width: 12rem;
  }
`

const Logo = () => {
  return (
    <Link href={'/'}>
      <LogoImage
        alt="logo"
        src={LogoSVG}
        priority={true}
      />
    </Link>
  )
}

export default Logo
