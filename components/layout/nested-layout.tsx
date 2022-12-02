import { ReactElement, useEffect } from 'react'
import { setScreenSize } from '../../utils/window/screen'
import styles from './nested-layout.module.css'
type NestedLayoutProps = {
  children: ReactElement
}

const NestedLayout = ({ children }: NestedLayoutProps) => {
  useEffect(() => {
    setScreenSize()
    window.addEventListener('resize', setScreenSize)

    return () => window.removeEventListener('resize', setScreenSize)
  }, [])
  return <div className={styles.container}>{children}</div>
}

export default NestedLayout
