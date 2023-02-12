import Image from 'next/image'
import React, { useState } from 'react'
import Normal from '../../images/btn_google_signin_light_normal_web@2x.png'
import LogoSVG from '../../images/googleLogin.svg'

import { isPlatformPC } from '../../utils/window/windowNavigator'
import { mobileLogIn, pcLogIn } from '../../firebase/auth/Auth'
import styled from 'styled-components'
import { useAuth } from '../layout/useAuth'

type GoogleLogInButtonProps = {
  action: Function
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 40px;

  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.6);

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    cursor: pointer;
  }
`
// 로그인 하기
const GoogleLogInButton = () => {
  const { googleLogIn } = useAuth()

  return (
    <Container onClick={googleLogIn}>
      <Image
        src={LogoSVG}
        alt="google login button"
        width={24}
        height={24}
        priority={true}
      />
    </Container>
  )
}

export default GoogleLogInButton
