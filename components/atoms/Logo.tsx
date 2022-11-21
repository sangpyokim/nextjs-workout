import Image from 'next/image'
import React from 'react'
import LogoSVG from '../../images/logo.svg'

const Logo = () => {
  return (
    <div>
        <Image alt='logo' src={LogoSVG} height={26} priority={true} />
    </div>
  )
}

export default Logo