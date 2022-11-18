import React, { ReactElement } from 'react'
import LogInButton from '../atoms/LogInButton'
import styles from './Header.module.css'
import { mobileLogIn, pcLogIn } from '../../utils/firebase/Auth'
import { isPlatformPC } from '../../utils/window/windowNavigator'

type HeaderProps = {
}

const Header = ({  }: HeaderProps) => {




    return (
        <header className={styles.container} >
            <LogInButton action={pcLogIn} title={'구글로그인'}  />
        </header>
    )
}

export default Header