import { ReactElement, useEffect } from 'react';
import { setScreenSize } from '../../utils/window/screen';
import Header from '../organisms/Header';
import styles from './full-height.module.css'

type FullHeightProps = {
    children: ReactElement
}

const FullHeight = ({ children }: FullHeightProps) => {
    


    useEffect(() => {
        setScreenSize()
        window.addEventListener('resize', setScreenSize)
        
        return () => window.removeEventListener('resize', setScreenSize);
    })
  
    return (
    <div className={styles.container} >
      {children}
    </div>
  )
}

export default FullHeight