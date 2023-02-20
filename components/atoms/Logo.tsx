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
        priority={true}
        style={{ height: '50px', width: '9rem' }}
      />
    </Link>
  )
}

export default Logo
