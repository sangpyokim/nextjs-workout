import { ReactElement } from 'react';
import Header from '../organisms/Header';
import styles from './nested-layout.module.css'
type NestedLayoutProps = {
    children: ReactElement
}

const NestedLayout = ({ children }: NestedLayoutProps) => {
  return (
    <div className={styles.container} >
      {children}
    </div>
  )
}

export default NestedLayout