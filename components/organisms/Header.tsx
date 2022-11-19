import React, { ReactElement } from 'react'
import LogInButton from '../atoms/LogInButton'
import Logo from '../atoms/Logo'
import styles from './Header.module.css'

type HeaderProps = {
}

const Header = ({  }: HeaderProps) => {




    return (
        <header className={styles.container} >
            <Logo />
        </header>
    )
}

export default Header