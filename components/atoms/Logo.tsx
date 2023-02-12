import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoSVG from '../../images/logo.svg'

const Logo = () => {
  return (
    <Link href={'/'}>
      <Image
        alt="logo"
        src={LogoSVG}
        height={26}
        priority={true}
      />
    </Link>
  )
}

export default Logo
