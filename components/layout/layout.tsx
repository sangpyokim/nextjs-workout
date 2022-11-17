import axios from 'axios';
import { ReactElement } from 'react';
import useSWR from 'swr';
import styles from './layout.module.css';
import { Lora } from '@next/font/google'

type LayoutProps = {
    children: ReactElement
}
const lora = Lora()
const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Layout = ({ children }: LayoutProps) => {
    const { data, error } = useSWR('/api/hello', fetcher)

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container} >{children}</div>
  )
}

export default Layout