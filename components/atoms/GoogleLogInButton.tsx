import Image from 'next/image'
import React, { useState } from 'react'
import Normal from '../../images/btn_google_signin_light_normal_web@2x.png'
import { isPlatformPC } from '../../utils/window/windowNavigator'
import { mobileLogIn, pcLogIn } from '../../firebase/auth/Auth'
import styled from 'styled-components'

type GoogleLogInButtonProps = {
  action: Function
}

const Container = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const GoogleLogInButton = () => {
  const [imageState, setImageState] = useState(Normal)

  const handleLogIn = () => {
    // setImageState(Pressed)
    // if (isPlatformPC()) {
    // } else {
    //   mobileLogIn()
    // }
    pcLogIn()
  }

  return (
    <Container onClick={() => handleLogIn()}>
      <Image
        src={imageState}
        alt="google login button"
        width={'140'}
        priority={true}
      />
    </Container>
  )
}

export default GoogleLogInButton
