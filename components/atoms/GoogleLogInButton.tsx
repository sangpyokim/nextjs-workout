import Image from 'next/image'
import React, { useState } from 'react'
import styles from './GoogleLoInButton.module.css'
import Normal from '../../images/btn_google_signin_light_normal_web@2x.png'
import Pressed from '../../images/btn_google_signin_light_pressed_web@2x.png'
import { isPlatformPC } from '../../utils/window/windowNavigator'
import { mobileLogIn, pcLogIn } from '../../utils/firebase/Auth'

type GoogleLogInButtonProps = {
  action: Function
}

const GoogleLogInButton = () => {
  const [ imageState, setImageState ] = useState(Normal)
  
  const handleLogIn = () => {
    // setImageState(Pressed)
    if (isPlatformPC()) {
      pcLogIn()

    } else {
      mobileLogIn()
    }
  }


  return (
    <div
      className={styles.button}
      onClick={() => handleLogIn()}
      onTouchStart={() => handleLogIn()}
      onTouchEnd={() => setImageState(Normal)}
    >
      <Image 
        src={imageState}
        alt='google login button'
        width={'140'}
        priority={true}
        />
    </div>
  )
}

export default GoogleLogInButton