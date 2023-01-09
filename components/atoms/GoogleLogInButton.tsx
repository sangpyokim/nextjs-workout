import Image from 'next/image'
import React, { useState } from 'react'
import Normal from '../../images/btn_google_signin_light_normal_web@2x.png'
import { isPlatformPC } from '../../utils/window/windowNavigator'
import { mobileLogIn, pcLogIn } from '../../utils/firebase/Auth'
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
    if (isPlatformPC()) {
      pcLogIn()
    } else {
      mobileLogIn()
    }
  }

  return (
    <Container
      onClick={() => handleLogIn()}
      onTouchStart={() => handleLogIn()}
      onTouchEnd={() => setImageState(Normal)}
    >
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
